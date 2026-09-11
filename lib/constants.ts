export const CASE_TYPES = ["civil", "criminal", "writ", "appeal", "execution", "other"] as const;
export type CaseType = (typeof CASE_TYPES)[number];

export const CASE_STATUSES = ["active", "adjourned", "disposed"] as const;
export type CaseStatus = (typeof CASE_STATUSES)[number];

export const CASE_STATUS_STYLES: Record<CaseStatus, string> = {
  active: "bg-green-50 text-green-700",
  adjourned: "bg-amber-50 text-amber-700",
  disposed: "bg-gray-100 text-gray-600",
};

export const NOTE_TYPES = ["note", "learning", "update"] as const;
export type NoteType = (typeof NOTE_TYPES)[number];

export const NOTE_TYPE_STYLES: Record<NoteType, string> = {
  note: "bg-gray-100 text-gray-700",
  learning: "bg-purple-50 text-purple-700",
  update: "bg-blue-50 text-blue-700",
};

export const RESEARCH_SOURCE_TYPES = ["statute", "judgement", "article", "other"] as const;
export type ResearchSourceType = (typeof RESEARCH_SOURCE_TYPES)[number];

export const RESEARCH_SOURCE_TYPE_STYLES: Record<ResearchSourceType, string> = {
  statute: "bg-blue-50 text-blue-700",
  judgement: "bg-indigo-50 text-indigo-700",
  article: "bg-green-50 text-green-700",
  other: "bg-gray-100 text-gray-600",
};
