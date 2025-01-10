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
      deck: {
        Row: {
          id: string
          power: number
          suit: Database["public"]["Enums"]["card_suit"]
          suit_power: number
          symbol: Database["public"]["Enums"]["card_symbol"]
        }
        Insert: {
          id?: string
          power: number
          suit: Database["public"]["Enums"]["card_suit"]
          suit_power: number
          symbol: Database["public"]["Enums"]["card_symbol"]
        }
        Update: {
          id?: string
          power?: number
          suit?: Database["public"]["Enums"]["card_suit"]
          suit_power?: number
          symbol?: Database["public"]["Enums"]["card_symbol"]
        }
        Relationships: []
      }
      match_users: {
        Row: {
          created_at: string | null
          dealer: boolean
          id: string
          lives: number
          match_id: string
          ready: boolean
          table_sit: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          dealer?: boolean
          id?: string
          lives?: number
          match_id: string
          ready?: boolean
          table_sit?: number | null
          user_id?: string
        }
        Update: {
          created_at?: string | null
          dealer?: boolean
          id?: string
          lives?: number
          match_id?: string
          ready?: boolean
          table_sit?: number | null
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
      player_cards: {
        Row: {
          card_id: string | null
          created_at: string
          match_user: string
          round_number: number
        }
        Insert: {
          card_id?: string | null
          created_at?: string
          match_user: string
          round_number: number
        }
        Update: {
          card_id?: string | null
          created_at?: string
          match_user?: string
          round_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "round_one_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "deck"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "round_one_match_user_fkey"
            columns: ["match_user"]
            isOneToOne: false
            referencedRelation: "match_users"
            referencedColumns: ["id"]
          },
        ]
      }
      round_one: {
        Row: {
          created_at: string
          id: number
          round_number: number
        }
        Insert: {
          created_at?: string
          id?: number
          round_number: number
        }
        Update: {
          created_at?: string
          id?: number
          round_number?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_email: {
        Args: {
          user_id: string
        }
        Returns: {
          email: string
        }[]
      }
      update_match_status_to_started: {
        Args: {
          _match_id: string
        }
        Returns: undefined
      }
      update_ready_status: {
        Args: {
          _match_id: string
          _is_ready: boolean
        }
        Returns: undefined
      }
    }
    Enums: {
      card_suit: "♣️" | "♥️" | "♠️" | "♦️"
      card_symbol:
        | "A"
        | "2"
        | "3"
        | "4"
        | "5"
        | "6"
        | "7"
        | "8"
        | "9"
        | "10"
        | "Q"
        | "J"
        | "K"
      match_status: "created" | "started" | "finished"
      round_status: "dealing" | "betting" | "playing" | "finished"
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
