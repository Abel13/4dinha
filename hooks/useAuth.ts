import { supabase } from '@/providers/supabase';
import { SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { useState } from 'react';
import { useUserSessionStore } from './useUserSessionStore';
import { useRouter } from 'expo-router';

export const useAuth = () => {
  const { setSession } = useUserSessionStore((state) => state);
  const [authError, setAuthError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const router = useRouter();

  const onAuth = async (credentials: SignInWithPasswordCredentials) => {
    try {
      setAuthError('');
      setLoading(true);
      const {
        error,
        data: { session },
      } = await supabase.auth.signInWithPassword(credentials);

      if (session) {
        setSession(session);
        router.replace('/(tabs)');
      } else setAuthError(error?.code);
      setLoading(false);
    } catch (error) {
      // ignore error
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  return { onAuth, signOut, loading, authError };
};
