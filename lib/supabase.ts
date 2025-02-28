import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ||
"https://ulxqlikkwniwckrrsrjr.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseHFsaWtrd25pd2NrcnJzcmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyNzk3NzEsImV4cCI6MjA1NDg1NTc3MX0.2EbSStmfFZW0CwXVJLD7rPRaNDguPKnt50BPyftsk0o";


if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)