import { supabase } from '@/providers/supabase';
import { fetchMatches } from '@/services/match';
import { Database } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';

export const useMatch = () => {
  const router = useRouter();

  const { data: matches, isLoading: loadingMatches } = useQuery({
    ...fetchMatches(),
  });

  const createMatch = useCallback(
    async (formData: Database['public']['Tables']['matches']['Insert']) => {
      const { data, error } = await supabase
        .from('matches')
        .insert(formData)
        .select('id');

      console.log(error);
      console.log(data);
      if (data) router.navigate('/(tabs)/matches');
    },
    [],
  );

  return { createMatch, loadingMatches, matches };
};
