import { useState } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '@/providers/supabase';
import { useUserSessionStore } from './useUserSessionStore';

export const useAuth = () => {
  const { setSession } = useUserSessionStore((state) => state);
  const [authError, setAuthError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const router = useRouter();

  const handleRegister = () => {
    router.navigate('/auth/register');
  };

  const onAuth = async (credentials: {
    email: string;
    password: string;
    options?: {
      captchaToken?: string;
    };
  }) => {
    try {
      setAuthError('');
      setLoading(true);

      if (
        !process.env.EXPO_PUBLIC_SUPABASE_URL!.startsWith('https://') ||
        !process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
      ) {
        throw new Error(
          'ENV inválida: defina EXPO_PUBLIC_SUPABASE_URL e EXPO_PUBLIC_SUPABASE_ANON_KEY',
        );
      }

      const {
        data: { session },
        error,
      } = await supabase.auth.signInWithPassword(credentials);

      if (error) {
        if (error.code === 'email_not_confirmed') {
          const { email } = credentials;

          router.push({
            pathname: '/auth/confirmation',
            params: {
              email,
            },
          });
          return;
        }

        throw error;
      }

      if (session) {
        setSession(session);

        router.replace('/(tabs)');
      }
    } catch (error) {
      if (error) {
        setAuthError((error as any).code);
      } else {
        setAuthError('Unknown error');
      }
    } finally {
      setLoading(false);
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

  return { onAuth, signOut, handleRegister, loading, authError };
};
