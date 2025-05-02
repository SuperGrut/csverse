import { createClient } from "@supabase/supabase-js";

// IMPORTANT: Replace with your actual Supabase URL and Anon Key
// You can get these from your Supabase project settings
const supabaseUrl = "https://tcofefgbplexnfjzlckf.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjb2ZlZmdicGxleG5manpsY2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MTkyOTEsImV4cCI6MjA2MTQ5NTI5MX0.BsJCVmjzCRkghVYeU83Prf3hedBcond3TL5XNxVDIW0";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Error: Supabase URL and Anon Key are required. Please update them in src/supabaseClient.js"
  );
  // You might want to throw an error or handle this case more gracefully
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
