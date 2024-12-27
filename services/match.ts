import { supabase } from '@/providers/supabase';
import { Database } from '@/types';

export const matchesKey = () => {
  return ['matches'];
};

export const fetchMatches = () => {
  return {
    queryKey: matchesKey(),
    queryFn: async (): Promise<
      Database['public']['Tables']['matches']['Row'][]
    > => {
      const { data } = await supabase.from('matches').select('*');

      if (data) return data;
      return [];
    },
    initialData: [],
  };
};
