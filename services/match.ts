import { supabase } from '@/providers/supabase';
import { Match, MatchInsert } from '@/types/Match';

export const matchesKey = () => {
  return ['matches'];
};

export const matchKey = (matchId: string) => {
  return ['match', matchId];
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

export const fetchMatch = (matchId: string) => {
  return {
    queryKey: matchKey(matchId),
    queryFn: async (): Promise<Match | null> => {
      if (!matchId) return null;
      const { data } = await supabase
        .from('matches')
        .select('*')
        .eq('id', matchId)
        .maybeSingle();

      if (data) return data;
      return null;
    },
    initialData: null,
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

export const startMatchService = async (matchId: string): Promise<void> => {
  await supabase.rpc('update_match_status_to_started', {
    _match_id: matchId,
  });
};

export const endMatchService = async (matchId: string): Promise<void> => {
  const { error, data } = await supabase.rpc('update_match_status_to_end', {
    _match_id: matchId,
  });

  console.log('ERROR', error, data);
};
