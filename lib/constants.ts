export const CASE_TYPES = ["civil", "criminal", "writ", "appeal", "execution", "other"] as const;
export type CaseType = (typeof CASE_TYPES)[number];

export const CASE_STATUSES = ["active", "adjourned", "disposed"] as const;
export type CaseStatus = (typeof CASE_STATUSES)[number];

export const NOTE_TYPES = ["note", "learning", "update"] as const;
export type NoteType = (typeof NOTE_TYPES)[number];
