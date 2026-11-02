import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://ordzywqirjnmfzgyhveq.supabase.co";

const SUPABASE_KEY = "sb_publishable_qC3Hdh4gbR4DUaw6dm8zAg_MS1lZumE";

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY,
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    }
);
