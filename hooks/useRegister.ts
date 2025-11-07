import { supabase } from '@/providers/supabase';
import { useState } from 'react';
import { router } from 'expo-router';
import { useDicebearBuilder } from './useDicebear';

interface IPlayerData {
  username: string;
  email: string;
  password: string;
}

export const useRegister = () => {
  const { applyParamsToState, imageSvg } = useDicebearBuilder();
  const [registerError, setRegisterError] = useState('');
  const [loading, setLoading] = useState(false);

  const register = async ({ username, password, email }: IPlayerData) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          image: imageSvg,
        },
      },
    });
    setLoading(false);
    if (error) {
      setRegisterError(error.code as string);
    } else {
      router.back();
    }
  };

  return { register, loading, registerError, loadImage: applyParamsToState };
};
