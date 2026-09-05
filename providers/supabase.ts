import { createClient } from '@supabase/supabase-js';
import { type Database } from '@/types';
import { storageAdapter } from './storageAdapter';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';
if (__DEV__) {
  console.log('SUPABASE_URL =', supabaseUrl);
  console.log('SUPABASE_KEY starts with', supabaseAnonKey.slice(0, 8));
}

(async () => {
  try {
    const url = `${supabaseUrl}/auth/v1/health`;
    const r = await fetch(url, { method: 'GET' });
    console.log('AUTH HEALTH →', r.status);

    const t = await r.text();
    console.log('AUTH HEALTH BODY →', t);
  } catch (e) {
    console.log('AUTH HEALTH FAIL →', String(e));
  }
})();

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: storageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
