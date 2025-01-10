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
          .select(
            `
        user_id,
        match_id,
        matches!inner(id, status)
      `,
          )
          .eq('user_id', user.id)
          .eq('matches.status', 'started')
          .limit(1)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (data && data.matches) {
          setGameId(data.matches.id);
        }
      } catch (e) {
        console.error('Erro ao executar a consulta:', e);
      }
    };

    fetchGame();
  }, [user]);

  return {
    gameId,
  };
};
