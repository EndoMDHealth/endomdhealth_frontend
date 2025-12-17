export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      e_consult_attachments: {
        Row: {
          created_at: string
          e_consult_id: string
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string | null
          id: string
        }
        Insert: {
          created_at?: string
          e_consult_id: string
          file_name: string
          file_path: string
          file_size?: number | null
          file_type?: string | null
          id?: string
        }
        Update: {
          created_at?: string
          e_consult_id?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "e_consult_attachments_e_consult_id_fkey"
            columns: ["e_consult_id"]
            isOneToOne: false
            referencedRelation: "e_consults"
            referencedColumns: ["id"]
          },
        ]
      }
      e_consult_messages: {
        Row: {
          created_at: string
          e_consult_id: string
          id: string
          is_read: boolean | null
          message: string
          sender_id: string
        }
        Insert: {
          created_at?: string
          e_consult_id: string
          id?: string
          is_read?: boolean | null
          message: string
          sender_id: string
        }
        Update: {
          created_at?: string
          e_consult_id?: string
          id?: string
          is_read?: boolean | null
          message?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "e_consult_messages_e_consult_id_fkey"
            columns: ["e_consult_id"]
            isOneToOne: false
            referencedRelation: "e_consults"
            referencedColumns: ["id"]
          },
        ]
      }
      e_consults: {
        Row: {
          additional_notes: string | null
          bmi: number | null
          clinical_question: string
          condition_category: Database["public"]["Enums"]["condition_category"]
          created_at: string
          height_cm: number | null
          id: string
          patient_age: number
          patient_dob: string | null
          patient_gender: string | null
          patient_initials: string
          physician_id: string
          responded_at: string | null
          responded_by: string | null
          response_notes: string | null
          status: Database["public"]["Enums"]["econsult_status"]
          updated_at: string
          weight_kg: number | null
        }
        Insert: {
          additional_notes?: string | null
          bmi?: number | null
          clinical_question: string
          condition_category: Database["public"]["Enums"]["condition_category"]
          created_at?: string
          height_cm?: number | null
          id?: string
          patient_age: number
          patient_dob?: string | null
          patient_gender?: string | null
          patient_initials: string
          physician_id: string
          responded_at?: string | null
          responded_by?: string | null
          response_notes?: string | null
          status?: Database["public"]["Enums"]["econsult_status"]
          updated_at?: string
          weight_kg?: number | null
        }
        Update: {
          additional_notes?: string | null
          bmi?: number | null
          clinical_question?: string
          condition_category?: Database["public"]["Enums"]["condition_category"]
          created_at?: string
          height_cm?: number | null
          id?: string
          patient_age?: number
          patient_dob?: string | null
          patient_gender?: string | null
          patient_initials?: string
          physician_id?: string
          responded_at?: string | null
          responded_by?: string | null
          response_notes?: string | null
          status?: Database["public"]["Enums"]["econsult_status"]
          updated_at?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      physician_roles: {
        Row: {
          created_at: string
          id: string
          npi_number: string | null
          phone: string | null
          practice_name: string | null
          role: Database["public"]["Enums"]["physician_role"]
          specialty: string | null
          state: string | null
          updated_at: string
          user_id: string
          verified: boolean | null
        }
        Insert: {
          created_at?: string
          id?: string
          npi_number?: string | null
          phone?: string | null
          practice_name?: string | null
          role?: Database["public"]["Enums"]["physician_role"]
          specialty?: string | null
          state?: string | null
          updated_at?: string
          user_id: string
          verified?: boolean | null
        }
        Update: {
          created_at?: string
          id?: string
          npi_number?: string | null
          phone?: string | null
          practice_name?: string | null
          role?: Database["public"]["Enums"]["physician_role"]
          specialty?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_physician_role: {
        Args: {
          _role: Database["public"]["Enums"]["physician_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_physician: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      condition_category:
        | "obesity"
        | "growth"
        | "diabetes"
        | "puberty"
        | "thyroid"
        | "pcos"
        | "other"
      econsult_status:
        | "submitted"
        | "under_review"
        | "awaiting_info"
        | "completed"
      physician_role: "physician" | "admin" | "specialist"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      condition_category: [
        "obesity",
        "growth",
        "diabetes",
        "puberty",
        "thyroid",
        "pcos",
        "other",
      ],
      econsult_status: [
        "submitted",
        "under_review",
        "awaiting_info",
        "completed",
      ],
      physician_role: ["physician", "admin", "specialist"],
    },
  },
} as const
