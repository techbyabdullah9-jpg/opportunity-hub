import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials not found. Auth features may not work.");
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

export type UserRole = "student" | "instructor";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  username: string;
  phone?: string;
  country?: string;
  city?: string;
  date_of_birth?: string;
  role: UserRole;
  avatar_url?: string;
  is_verified: boolean;
}

export interface InstructorProfile {
  id: string;
  display_name: string;
  headline: string;
  bio?: string;
  years_of_experience: number;
  teaching_categories: string[];
  languages_spoken: string[];
  linkedin_url?: string;
  website_url?: string;
}

export interface StudentProfile {
  id: string;
  learning_interests: string[];
  preferred_language?: string;
}
