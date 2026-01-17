import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (process.env.NODE_ENV === 'development') {
    console.log('[Supabase Debug] URL:', supabaseUrl);
    console.log('[Supabase Debug] Anon Key (First 5 chars):', supabaseAnonKey?.substring(0, 5));
}

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase credentials missing. Utilizing fallback for build environment.');
}

// Fallback values to prevent build crasing during SSG
const url = supabaseUrl || 'https://placeholder.supabase.co';
const key = supabaseAnonKey || 'placeholder-key-for-build';

export const supabase = createClient(url, key);

