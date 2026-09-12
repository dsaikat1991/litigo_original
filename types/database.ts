import type { CaseStatus, CaseType, NoteType, ResearchSourceType } from "@/lib/constants";

/**
 * Hand-written to mirror `supabase/migrations/0001_init.sql`, matching the
 * exact shape `supabase gen types typescript` would produce. Replace with
 * that generated output once the Supabase CLI is linked to this project —
 * keep the shape identical (Relationships arrays, empty Views/Functions/
 * Enums/CompositeTypes, and __InternalSupabase all matter to postgrest-js's
 * generic inference; dropping any of them silently degrades queries to `never`).
 */
export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "12";
  };
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          bar_enrollment_no: string | null;
          practice_city: string | null;
          courts: string[];
          avatar_url: string | null;
          reminder_days: number[];
          reminder_email_days: number[];
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          phone?: string | null;
          bar_enrollment_no?: string | null;
          practice_city?: string | null;
          courts?: string[];
          avatar_url?: string | null;
          reminder_days?: number[];
          reminder_email_days?: number[];
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      cases: {
        Row: {
          id: string;
          advocate_id: string;
          case_title: string;
          client_name: string | null;
          opposing_party: string | null;
          court: string | null;
          case_number: string | null;
          cnr_number: string | null;
          case_type: CaseType;
          status: CaseStatus;
          filing_date: string | null;
          next_hearing_date: string | null;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          advocate_id: string;
          case_title: string;
          client_name?: string | null;
          opposing_party?: string | null;
          court?: string | null;
          case_number?: string | null;
          cnr_number?: string | null;
          case_type?: CaseType;
          status?: CaseStatus;
          filing_date?: string | null;
          next_hearing_date?: string | null;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["cases"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "cases_advocate_id_fkey";
            columns: ["advocate_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      hearings: {
        Row: {
          id: string;
          case_id: string;
          advocate_id: string;
          hearing_date: string;
          purpose: string | null;
          order_notes: string | null;
          arguments_made: string | null;
          court_direction: string | null;
          documents_filed: string[];
          next_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          case_id: string;
          advocate_id: string;
          hearing_date: string;
          purpose?: string | null;
          order_notes?: string | null;
          arguments_made?: string | null;
          court_direction?: string | null;
          documents_filed?: string[];
          next_date?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["hearings"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "hearings_case_id_fkey";
            columns: ["case_id"];
            isOneToOne: false;
            referencedRelation: "cases";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "hearings_advocate_id_fkey";
            columns: ["advocate_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      notes: {
        Row: {
          id: string;
          advocate_id: string;
          case_id: string | null;
          type: NoteType;
          content: string;
          tags: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          advocate_id: string;
          case_id?: string | null;
          type?: NoteType;
          content: string;
          tags?: string[];
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["notes"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "notes_case_id_fkey";
            columns: ["case_id"];
            isOneToOne: false;
            referencedRelation: "cases";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notes_advocate_id_fkey";
            columns: ["advocate_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      tasks: {
        Row: {
          id: string;
          case_id: string;
          advocate_id: string;
          hearing_id: string | null;
          title: string;
          due_date: string | null;
          is_done: boolean;
          completed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          case_id: string;
          advocate_id: string;
          hearing_id?: string | null;
          title: string;
          due_date?: string | null;
          is_done?: boolean;
          completed_at?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["tasks"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "tasks_case_id_fkey";
            columns: ["case_id"];
            isOneToOne: false;
            referencedRelation: "cases";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tasks_advocate_id_fkey";
            columns: ["advocate_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tasks_hearing_id_fkey";
            columns: ["hearing_id"];
            isOneToOne: false;
            referencedRelation: "hearings";
            referencedColumns: ["id"];
          },
        ];
      };
      research_items: {
        Row: {
          id: string;
          case_id: string;
          advocate_id: string;
          source_type: ResearchSourceType;
          citation: string;
          notes: string | null;
          link: string | null;
          tags: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          case_id: string;
          advocate_id: string;
          source_type?: ResearchSourceType;
          citation: string;
          notes?: string | null;
          link?: string | null;
          tags?: string[];
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["research_items"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "research_items_case_id_fkey";
            columns: ["case_id"];
            isOneToOne: false;
            referencedRelation: "cases";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "research_items_advocate_id_fkey";
            columns: ["advocate_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      delete_own_account: {
        Args: Record<string, never>;
        Returns: undefined;
      };
    };
    Enums: {
      case_status: CaseStatus;
      case_type: CaseType;
      note_type: NoteType;
      research_source_type: ResearchSourceType;
    };
    CompositeTypes: Record<string, never>;
  };
};

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Case = Database["public"]["Tables"]["cases"]["Row"];
export type Hearing = Database["public"]["Tables"]["hearings"]["Row"];
export type Note = Database["public"]["Tables"]["notes"]["Row"];
export type Task = Database["public"]["Tables"]["tasks"]["Row"];
export type ResearchItem = Database["public"]["Tables"]["research_items"]["Row"];
