import { supabase } from '@/providers/supabase';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export const useGame = (user?: User) => {
  const [gameId, setGameId] = useState<string | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('match_users')
          .select(`match:matches(id)`)
          .eq('user_id', user.id)
          .eq('matches.status', 'started')
          .maybeSingle();

        if (error) {
          console.error('Erro ao buscar dados:', error.message);
          throw error;
        }

        if (data) setGameId(data.match.id);
      } catch (e) {
        // Do nothing
      }
    };

    fetchGame();
  }, [user]);

  return {
    gameId,
  };
};
