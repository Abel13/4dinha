import { supabase } from '@/providers/supabase';

export type SocialProvider = 'apple' | 'google';

export const signInWithProvider = async (
  provider: SocialProvider,
  token: string,
) => {
  return supabase.auth.signInWithIdToken({
    provider,
    token,
  });
};
