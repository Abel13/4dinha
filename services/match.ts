import { supabase } from '@/providers/supabase';
import { Match, MatchInsert } from '@/types/Match';

export const matchesKey = () => {
  return ['matches'];
};

export const fetchMatches = () => {
  return {
    queryKey: matchesKey(),
    queryFn: async (): Promise<Match[]> => {
      const { data } = await supabase
        .from('matches')
        .select('*')
        .eq('status', 'created');

      if (data) return data;
      return [];
    },
    initialData: [],
  };
};

export const createMatchService = async (
  formData: MatchInsert,
): Promise<string | null> => {
  const { data: match } = await supabase
    .from('matches')
    .insert(formData)
    .select('*')
    .maybeSingle();

  if (match) return match.id;

  return null;
};
