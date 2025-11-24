import { supabase } from '@/providers/supabase';
import { useState } from 'react';
import { router } from 'expo-router';
import { useDicebearBuilder } from './useDicebearBuilder';
import { AppleCredential } from './useAppleAuth';

export const useRegister = () => {
  const { applyParamsToState, imageSvg } = useDicebearBuilder();
  const [registerError, setRegisterError] = useState('');
  const [loading, setLoading] = useState(false);

  const onAppleAuth = async (
    credential: AppleCredential,
    username?: string,
  ) => {
    try {
      setRegisterError('');
      setLoading(true);

      if (!username) {
        throw new Error('username_required');
      }

      const { error: authError } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken,
      });

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
    loadImage: applyParamsToState,
    updateUser,
    loading,
    registerError,
  };
};
