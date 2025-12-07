import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      drawings: {
        Row: {
          id: string;
          username: string;
          digit: number;
          image_data: number[];
          timestamp: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          username: string;
          digit: number;
          image_data: number[];
          timestamp?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          digit?: number;
          image_data?: number[];
          timestamp?: string;
          created_at?: string;
        };
      };
      users: {
        Row: {
          username: string;
          count: number;
          joined_at: string;
          created_at: string;
        };
        Insert: {
          username: string;
          count?: number;
          joined_at?: string;
          created_at?: string;
        };
        Update: {
          username?: string;
          count?: number;
          joined_at?: string;
          created_at?: string;
        };
      };
    };
  };
}
