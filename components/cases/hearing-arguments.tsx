"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { createHearingArgument, deleteHearingArgument, updateHearingArgument } from "@/lib/data/hearing-arguments";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ARGUMENT_OUTCOMES, ARGUMENT_OUTCOME_LABELS, ARGUMENT_OUTCOME_STYLES, type ArgumentOutcome } from "@/lib/constants";
import type { HearingArgument } from "@/types/database";

const NO_OUTCOME = "__unknown__";

/** Inline list of the advocate's own arguments made at a hearing, each with a one-click outcome. */
export function HearingArguments({ hearingId, arguments: argumentsList }: { hearingId: string; arguments: HearingArgument[] }) {
  const router = useRouter();
  const supabase = createClient();

  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setAdding(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be signed in.");
      setAdding(false);
      return;
    }

    const { error } = await createHearingArgument(supabase, {
      advocate_id: user.id,
      hearing_id: hearingId,
      argument_text: text.trim(),
    });

    if (error) {
      setError(error.message);
      setAdding(false);
      return;
    }

    setText("");
    setAdding(false);
    router.refresh();
  }

  async function handleOutcomeChange(argument: HearingArgument, value: string) {
    const outcome = value === NO_OUTCOME ? null : (value as ArgumentOutcome);
    const { error } = await updateHearingArgument(supabase, argument.id, { outcome });
    if (error) {
      setError(error.message);
      return;
    }
    router.refresh();
  }

  async function handleRemove(argument: HearingArgument) {
    const { error } = await deleteHearingArgument(supabase, argument.id);
    if (error) {
      setError(error.message);
      return;
    }
    router.refresh();
  }

  return (
    <div className="mt-3 border-t border-gray-100 pt-3">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">Your arguments</p>
      {argumentsList.length > 0 && (
        <ul className="mb-2 space-y-1.5">
          {argumentsList.map((a) => (
            <li key={a.id} className="flex items-start gap-2">
              <span className="flex-1 text-sm text-gray-700">{a.argument_text}</span>
              <Select value={a.outcome ?? NO_OUTCOME} onValueChange={(value) => handleOutcomeChange(a, value)}>
                <SelectTrigger
                  className={`h-auto w-auto shrink-0 gap-1 rounded-full border-0 px-2 py-0.5 text-xs font-medium ${
                    a.outcome ? ARGUMENT_OUTCOME_STYLES[a.outcome] : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value={NO_OUTCOME}>Not yet known</SelectItem>
                  {ARGUMENT_OUTCOMES.map((o) => (
                    <SelectItem key={o} value={o}>
                      {ARGUMENT_OUTCOME_LABELS[o]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <button
                type="button"
                onClick={() => handleRemove(a)}
                className="shrink-0 text-xs text-gray-400 hover:text-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add an argument you made..."
          className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900/10"
        />
        <button
          type="submit"
          disabled={adding}
          className="rounded-md border border-gray-300 px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
        >
          Add
        </button>
      </form>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
