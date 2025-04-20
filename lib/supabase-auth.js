import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a Supabase client for browser usage (client-side)
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
    }
});

// Helper function to get current session
export const getCurrentSession = async () => {
    const { data, error } = await supabaseClient.auth.getSession();
    return { session: data?.session, error };
};

// Helper function to get current user
export const getCurrentUser = async () => {
    const { data, error } = await supabaseClient.auth.getUser();
    return { user: data?.user, error };
};