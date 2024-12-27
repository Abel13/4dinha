import { supabase } from '@/providers/supabase';
import { Database } from '@/types';
import { MatchInsert } from '@/types/Match';
import { MatchUser, MatchUserInsert } from '@/types/MatchUser';

export const matchesKey = (matchId: string) => {
  return ['match-users', matchId];
};

export const fetchMatchUsers = (matchId: string) => {
  return {
    queryKey: matchesKey(matchId),
    queryFn: async (): Promise<MatchUser[]> => {
      const { data } = await supabase
        .from('match_users')
        .select('*')
        .eq('match_id', matchId);

      if (data) return data;
      return [];
    },
    initialData: [],
  };
};

export const enterMatchService = async ({
  matchId,
  userId,
}: {
  matchId: string;
  userId: string;
}): Promise<string | null> => {
  const { data: matchUser, error } = await supabase
    .from('match_users')
    .upsert({
      match_id: matchId,
    })
    .eq('match_id', matchId)
    .eq('user_id', userId)
    .select('*')
    .maybeSingle();

  if (error && error.code === '23505') return matchId;
  if (matchUser) return matchUser.match_id;

  return null;
};
