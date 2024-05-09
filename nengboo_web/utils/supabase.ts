import { createClient } from "@supabase/supabase-js"

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://whrmaertzkkanlgksexz.supabase.co"
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indocm1hZXJ0emtrYW5sZ2tzZXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxOTczMDQsImV4cCI6MjAyOTc3MzMwNH0.7wkeFbPAVpwwoMY0JDscZjGlQtX19pUGbVHpwLKS6JM"

export const supabase = createClient(supabaseUrl, supabaseKey)
