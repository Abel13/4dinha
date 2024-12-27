import { supabase } from '@/providers/supabase';
import { Player } from '@/types/Player';

export const playerKey = (playerId: string) => {
  return ['player', playerId];
};

export const getPlayer = (playerId: string) => {
  return {
    queryKey: playerKey(playerId),
    queryFn: async (): Promise<Player[0] | null> => {
      const { data } = await supabase
        .rpc('get_user_email', {
          user_id: playerId,
        })
        .maybeSingle();

      if (data) return data;
      return null;
    },
    initialData: null,
  };
};
