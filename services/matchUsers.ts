import { supabase } from '@/providers/supabase';
import { MatchUser } from '@/types/MatchUser';
import { UpdateStatusPayload } from '@/types/UpdateStatus';

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
}: {
  matchId: string;
}): Promise<string | null> => {
  const { data: matchUser, error } = await supabase
    .from('match_users')
    .insert({
      match_id: matchId,
    })
    .select('*')
    .maybeSingle();

  console.log(error);

  if (error && error.code === '23505') return matchId;
  if (matchUser) return matchUser.match_id;

  return null;
};

export const updateStatusService = async (payload: UpdateStatusPayload) => {
  try {
    const { data, error } = await supabase.rpc('update_ready_status', payload);

    if (error) {
      throw error;
    }

    return data;
  } catch (e) {
    // ignore error
  }
};
