import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (process.env.NODE_ENV === 'development') {
    console.log('[Supabase Debug] URL:', supabaseUrl);
    console.log('[Supabase Debug] Anon Key (First 5 chars):', supabaseAnonKey?.substring(0, 5));
}

if (!supabaseUrl || !supabaseAnonKey) {
    const errorMsg = '🚨 ERROR CRÍTICO: Configura tu .env.local con las llaves de Supabase (NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY).';
    console.error(errorMsg);
    if (typeof window !== 'undefined') {
        alert(errorMsg);
    }
    throw new Error(errorMsg);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

