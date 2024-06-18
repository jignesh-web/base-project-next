import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!,
  {
    auth: {
      detectSessionInUrl: true, // detect session in url (for Oauth redirects)
      // storage: , //custom configuration for storage
    },
  }
);
