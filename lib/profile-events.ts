const PROFILE_UPDATED_EVENT = "mylitigo:profile-updated";

/** Notifies any listeners (e.g. the nav bar's user menu) that the current user's profile changed. */
export function emitProfileUpdated() {
  window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT));
}

export function onProfileUpdated(handler: () => void) {
  window.addEventListener(PROFILE_UPDATED_EVENT, handler);
  return () => window.removeEventListener(PROFILE_UPDATED_EVENT, handler);
}
