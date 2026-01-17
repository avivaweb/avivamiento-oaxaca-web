import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (process.env.NODE_ENV === 'development') {
    console.log('[Supabase Debug] URL:', supabaseUrl);
    console.log('[Supabase Debug] Anon Key (First 5 chars):', supabaseAnonKey?.substring(0, 5));
}

// Enhanced Debugging for Production (Runtime)
if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
    console.error('🚨 Supabase Error: Credentials missing in runtime environment. Check Vercel Env Vars.');
}

// Fallback values to prevent build crashing during SSG
const url = supabaseUrl || 'https://placeholder.supabase.co';
const key = supabaseAnonKey || 'placeholder-key-for-build';

// Enforce HTTPS
const secureUrl = url.startsWith('http://') ? url.replace('http://', 'https://') : url;

export const supabase = createClient(secureUrl, key, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
});

