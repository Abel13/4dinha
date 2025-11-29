import { supabase } from '@/providers/supabase';
import { useState } from 'react';
import { router } from 'expo-router';
import { useDicebearBuilder } from './useDicebearBuilder';
import { AppleCredential } from './useAppleAuth';
import type { SocialProvider } from '@/lib/auth/signInWithProvider';
import { signInWithProvider } from '@/lib/auth/signInWithProvider';

export const useRegister = () => {
  const { applyParamsToState, imageSvg } = useDicebearBuilder();
  const [registerError, setRegisterError] = useState('');
  const [loading, setLoading] = useState(false);

  const registerWithProvider = async ({
    provider,
    token,
    username,
  }: {
    provider: SocialProvider;
    token: string;
    username?: string;
  }) => {
    try {
      setRegisterError('');
      setLoading(true);

      if (!username) {
        throw new Error('username_required');
      }

      const { error: authError } = await signInWithProvider(provider, token);

      if (authError) {
        throw authError;
      }

      // Update user metadata with all information
      await supabase.auth.updateUser({
        data: {
          username,
          image: imageSvg,
        },
      });

      router.back();
    } catch (error) {
      if (error) {
        setRegisterError((error as any).code || (error as any).message);
      } else {
        setRegisterError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  const onAppleAuth = async (
    credential: AppleCredential,
    username?: string,
  ) => {
    if (!credential.identityToken) {
      setRegisterError('Unknown error');
      return;
    }
    await registerWithProvider({
      provider: 'apple',
      token: credential.identityToken,
      username,
    });
  };

  const onGoogleAuth = async (token: string, username?: string) => {
    await registerWithProvider({
      provider: 'google',
      token,
      username,
    });
  };

  const updateUser = async (username: string) => {
    await supabase.auth.updateUser({
      data: {
        username: username,
        image: imageSvg,
      },
    });

    router.back();
  };

  return {
    onAppleAuth,
    onGoogleAuth,
    loadImage: applyParamsToState,
    updateUser,
    loading,
    registerError,
  };
};
