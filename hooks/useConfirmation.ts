import { supabase } from '@/providers/supabase';
import { useRouter } from 'expo-router';
import { useState } from 'react';

interface IValidateForm {
  email: string;
  token: string;
}

export const useConfirmation = () => {
  const [loading, setLoading] = useState<boolean>();
  const [confirmationError, setConfirmationError] = useState<string>();

  const router = useRouter();

  const validate = async ({ email, token }: IValidateForm) => {
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });

    if (error) {
      setConfirmationError(error.code);
      setLoading(false);
      return;
    }

    router.back();
    setLoading(false);
  };

  return { validate, confirmationError, loading };
};
