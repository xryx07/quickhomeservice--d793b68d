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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string
          created_at: string
          id: string
          is_default: boolean | null
          landmark: string | null
          state: string
          street: string
          type: string
          user_id: string
          zip_code: string
        }
        Insert: {
          city: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          landmark?: string | null
          state: string
          street: string
          type?: string
          user_id: string
          zip_code: string
        }
        Update: {
          city?: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          landmark?: string | null
          state?: string
          street?: string
          type?: string
          user_id?: string
          zip_code?: string
        }
        Relationships: []
      }
      booking_status_history: {
        Row: {
          booking_id: string
          changed_by: string | null
          created_at: string
          id: string
          note: string | null
          status: string
        }
        Insert: {
          booking_id: string
          changed_by?: string | null
          created_at?: string
          id?: string
          note?: string | null
          status: string
        }
        Update: {
          booking_id?: string
          changed_by?: string | null
          created_at?: string
          id?: string
          note?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_status_history_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          address_city: string
          address_landmark: string | null
          address_state: string
          address_street: string
          address_type: string | null
          address_zip: string
          cancellation_reason: string | null
          cancelled_at: string | null
          commission: number
          coupon_code: string | null
          created_at: string
          customer_email: string | null
          customer_id: string
          customer_name: string
          customer_phone: string | null
          date_time: string
          discount_amount: number
          eta_minutes: number | null
          feedback: string | null
          id: string
          note: string | null
          payment_method: string | null
          price: number
          provider_id: string | null
          provider_name: string
          rating: number | null
          refund_amount: number
          reschedule_count: number
          reschedule_reason: string | null
          service_id: string | null
          service_name: string
          status: string
          updated_at: string
        }
        Insert: {
          address_city: string
          address_landmark?: string | null
          address_state: string
          address_street: string
          address_type?: string | null
          address_zip: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          commission?: number
          coupon_code?: string | null
          created_at?: string
          customer_email?: string | null
          customer_id: string
          customer_name?: string
          customer_phone?: string | null
          date_time: string
          discount_amount?: number
          eta_minutes?: number | null
          feedback?: string | null
          id?: string
          note?: string | null
          payment_method?: string | null
          price?: number
          provider_id?: string | null
          provider_name?: string
          rating?: number | null
          refund_amount?: number
          reschedule_count?: number
          reschedule_reason?: string | null
          service_id?: string | null
          service_name: string
          status?: string
          updated_at?: string
        }
        Update: {
          address_city?: string
          address_landmark?: string | null
          address_state?: string
          address_street?: string
          address_type?: string | null
          address_zip?: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          commission?: number
          coupon_code?: string | null
          created_at?: string
          customer_email?: string | null
          customer_id?: string
          customer_name?: string
          customer_phone?: string | null
          date_time?: string
          discount_amount?: number
          eta_minutes?: number | null
          feedback?: string | null
          id?: string
          note?: string | null
          payment_method?: string | null
          price?: number
          provider_id?: string | null
          provider_name?: string
          rating?: number | null
          refund_amount?: number
          reschedule_count?: number
          reschedule_reason?: string | null
          service_id?: string | null
          service_name?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      coupon_redemptions: {
        Row: {
          booking_id: string | null
          coupon_id: string
          created_at: string
          discount_amount: number
          id: string
          user_id: string
        }
        Insert: {
          booking_id?: string | null
          coupon_id: string
          created_at?: string
          discount_amount?: number
          id?: string
          user_id: string
        }
        Update: {
          booking_id?: string | null
          coupon_id?: string
          created_at?: string
          discount_amount?: number
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coupon_redemptions_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupon_redemptions_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          code: string
          created_at: string
          description: string
          discount_type: string
          discount_value: number
          expires_at: string | null
          id: string
          is_active: boolean
          max_discount: number | null
          min_order_value: number
          times_used: number
          updated_at: string
          usage_limit: number | null
        }
        Insert: {
          code: string
          created_at?: string
          description?: string
          discount_type?: string
          discount_value?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_discount?: number | null
          min_order_value?: number
          times_used?: number
          updated_at?: string
          usage_limit?: number | null
        }
        Update: {
          code?: string
          created_at?: string
          description?: string
          discount_type?: string
          discount_value?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_discount?: number | null
          min_order_value?: number
          times_used?: number
          updated_at?: string
          usage_limit?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          background_verified: boolean
          city: string | null
          completed_jobs: number
          created_at: string
          email: string | null
          full_name: string
          id: string
          phone: string | null
          state: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          background_verified?: boolean
          city?: string | null
          completed_jobs?: number
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          state?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          background_verified?: boolean
          city?: string | null
          completed_jobs?: number
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          category: string
          city: string | null
          created_at: string
          description: string
          duration: string | null
          eco_friendly: boolean
          equipment_included: boolean | null
          features: string[] | null
          id: string
          image: string | null
          is_active: boolean
          name: string
          price: number
          provider_id: string | null
          provider_name: string
          rating: number
          service_area: string[] | null
          updated_at: string
        }
        Insert: {
          category: string
          city?: string | null
          created_at?: string
          description?: string
          duration?: string | null
          eco_friendly?: boolean
          equipment_included?: boolean | null
          features?: string[] | null
          id?: string
          image?: string | null
          is_active?: boolean
          name: string
          price?: number
          provider_id?: string | null
          provider_name?: string
          rating?: number
          service_area?: string[] | null
          updated_at?: string
        }
        Update: {
          category?: string
          city?: string | null
          created_at?: string
          description?: string
          duration?: string | null
          eco_friendly?: boolean
          equipment_included?: boolean | null
          features?: string[] | null
          id?: string
          image?: string | null
          is_active?: boolean
          name?: string
          price?: number
          provider_id?: string | null
          provider_name?: string
          rating?: number
          service_area?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      user_addresses: {
        Row: {
          city: string
          created_at: string
          id: string
          is_default: boolean
          label: string
          landmark: string | null
          state: string
          street: string
          updated_at: string
          user_id: string
          zip_code: string
        }
        Insert: {
          city: string
          created_at?: string
          id?: string
          is_default?: boolean
          label?: string
          landmark?: string | null
          state: string
          street: string
          updated_at?: string
          user_id: string
          zip_code: string
        }
        Update: {
          city?: string
          created_at?: string
          id?: string
          is_default?: boolean
          label?: string
          landmark?: string | null
          state?: string
          street?: string
          updated_at?: string
          user_id?: string
          zip_code?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "customer" | "provider"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin", "customer", "provider"],
    },
  },
} as const
