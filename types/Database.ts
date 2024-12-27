export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      match_users: {
        Row: {
          created_at: string | null
          id: string
          lives: number
          match_id: string
          next_user: string | null
          ready: boolean | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          lives: number
          match_id: string
          next_user?: string | null
          ready?: boolean | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          lives?: number
          match_id?: string
          next_user?: string | null
          ready?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "match_users_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          created_at: string | null
          id: string
          name: string
          status: Database["public"]["Enums"]["match_status"] | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          status?: Database["public"]["Enums"]["match_status"] | null
          user_id?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["match_status"] | null
          user_id?: string
        }
        Relationships: []
      }
      round_user_cards: {
        Row: {
          card: number
          created_at: string | null
          id: string
          round_id: string | null
          user_id: string | null
        }
        Insert: {
          card: number
          created_at?: string | null
          id?: string
          round_id?: string | null
          user_id?: string | null
        }
        Update: {
          card?: number
          created_at?: string | null
          id?: string
          round_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "round_user_cards_round_id_fkey"
            columns: ["round_id"]
            isOneToOne: false
            referencedRelation: "rounds"
            referencedColumns: ["id"]
          },
        ]
      }
      round_users: {
        Row: {
          bet: number | null
          created_at: string | null
          current: boolean | null
          round_id: string
          round_score: number | null
          user_id: string
        }
        Insert: {
          bet?: number | null
          created_at?: string | null
          current?: boolean | null
          round_id: string
          round_score?: number | null
          user_id: string
        }
        Update: {
          bet?: number | null
          created_at?: string | null
          current?: boolean | null
          round_id?: string
          round_score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "round_users_round_id_fkey"
            columns: ["round_id"]
            isOneToOne: false
            referencedRelation: "rounds"
            referencedColumns: ["id"]
          },
        ]
      }
      rounds: {
        Row: {
          created_at: string | null
          dealer: string
          id: string
          match_id: string
          number: number
          status: Database["public"]["Enums"]["round_status"] | null
          trump: number | null
        }
        Insert: {
          created_at?: string | null
          dealer: string
          id?: string
          match_id: string
          number: number
          status?: Database["public"]["Enums"]["round_status"] | null
          trump?: number | null
        }
        Update: {
          created_at?: string | null
          dealer?: string
          id?: string
          match_id?: string
          number?: number
          status?: Database["public"]["Enums"]["round_status"] | null
          trump?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rounds_dealer_fkey"
            columns: ["dealer"]
            isOneToOne: false
            referencedRelation: "match_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rounds_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      turns: {
        Row: {
          created_at: string | null
          id: string
          number: number
          round_id: string
          winner: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          number: number
          round_id: string
          winner?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          number?: number
          round_id?: string
          winner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "turns_round_id_fkey"
            columns: ["round_id"]
            isOneToOne: false
            referencedRelation: "rounds"
            referencedColumns: ["id"]
          },
        ]
      }
      user_turn: {
        Row: {
          card: number
          created_at: string | null
          turn_id: string
          user_id: string
        }
        Insert: {
          card: number
          created_at?: string | null
          turn_id: string
          user_id: string
        }
        Update: {
          card?: number
          created_at?: string | null
          turn_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_turn_turn_id_fkey"
            columns: ["turn_id"]
            isOneToOne: false
            referencedRelation: "turns"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      match_status: "created" | "started" | "finished"
      round_status: "bet" | "play" | "finished"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
