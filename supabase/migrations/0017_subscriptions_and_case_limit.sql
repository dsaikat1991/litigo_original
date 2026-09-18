-- mylitigo: Razorpay-backed subscriptions, and a hard free-tier case limit.

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  advocate_id uuid not null unique references profiles(id) on delete cascade,
  razorpay_customer_id text,
  razorpay_subscription_id text,
  plan text not null default 'free' check (plan in ('free', 'pro')),
  billing_cycle text check (billing_cycle in ('monthly', 'annual')),
  status text not null default 'created' check (status in ('created', 'active', 'cancelled', 'past_due')),
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Only ever written by the server (the create-subscription route, using the
-- caller's own verified session, and the Razorpay webhook, using the
-- service-role key) — never directly from a client. RLS grants read-only
-- access to the owning advocate and denies everything else by default.
alter table subscriptions enable row level security;

create policy "subscriptions: owner read access" on subscriptions
  for select using (advocate_id = auth.uid());

create function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger subscriptions_set_updated_at
  before update on subscriptions
  for each row execute procedure set_updated_at();

-- Free tier is capped at 5 non-disposed cases. Enforced here (not just in the
-- UI) since case creation goes straight from the browser to Supabase with no
-- server checkpoint in between — this trigger is the actual boundary.
--
-- Accounts created before this migration shipped are grandfathered with no
-- limit, as a one-time goodwill gesture for early users who signed up before
-- there was any paywall to agree to.
create function enforce_case_limit()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  advocate_created_at timestamptz;
  has_active_pro boolean;
  non_disposed_count int;
begin
  select created_at into advocate_created_at from profiles where id = new.advocate_id;
  if advocate_created_at < '2026-09-18 00:00:00+00'::timestamptz then
    return new;
  end if;

  select exists(
    select 1 from subscriptions
    where advocate_id = new.advocate_id and plan = 'pro' and status = 'active'
  ) into has_active_pro;
  if has_active_pro then
    return new;
  end if;

  select count(*) into non_disposed_count
  from cases
  where advocate_id = new.advocate_id and status != 'disposed';

  if non_disposed_count >= 5 then
    raise exception 'Free plan is limited to 5 active cases. Upgrade to Litigo Pro to add more.'
      using errcode = 'P0001';
  end if;

  return new;
end;
$$;

create trigger enforce_case_limit_trigger
  before insert on cases
  for each row execute procedure enforce_case_limit();
