import { useState } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '@/providers/supabase';
import { useUserSessionStore } from './useUserSessionStore';
import { AppleCredential } from './useAppleAuth';
import type { SocialProvider } from '@/lib/auth/signInWithProvider';
import { signInWithProvider } from '@/lib/auth/signInWithProvider';

export const useAuth = () => {
  const { setSession } = useUserSessionStore((state) => state);
  const [authError, setAuthError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const router = useRouter();

  const handleRegister = () => {
    router.navigate('/auth/register');
  };

  const authenticate = async (provider: SocialProvider, token: string) => {
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
        error: authError,
        data: { session },
      } = await signInWithProvider(provider, token);

      if (authError) {
        if (authError.message?.includes('Database error')) {
          throw new Error(
            'Database error: Please ensure your database triggers handle Apple Sign In users. The trigger may be expecting a username field.',
          );
        }
        throw authError;
      }

      if (session) {
        if (session.user.user_metadata.username) {
          setSession(session);
          router.replace('/(tabs)');
        } else {
          router.push('/auth/update');
        }
      }
    } catch (error) {
      if (error) {
        setAuthError((error as any).code || (error as any).message);
      } else {
        setAuthError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  const onAppleAuth = async (credential: AppleCredential) => {
    if (!credential.identityToken) {
      setAuthError('Unknown error');
      return;
    }
    await authenticate('apple', credential.identityToken);
  };

  const onGoogleAuth = async (token: string) => {
    await authenticate('google', token);
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

  return {
    onAppleAuth,
    onGoogleAuth,
    signOut,
    handleRegister,
    loading,
    authError,
  };
};
