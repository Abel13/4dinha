import { type BetInsert, type Deck, type Game } from '@/types';
import { supabase } from '@/providers/supabase';
import { api } from './api';

export const gameKey = (gameId: string) => {
  return ['game', gameId];
};

export const trumpKey = (gameId: string, roundNumber: number) => {
  return ['trump', gameId, roundNumber];
};

export const updateGame = (gameId: string, token: string) => {
  return {
    queryKey: gameKey(gameId),
    queryFn: async (): Promise<Game> => {
      if (!gameId) return {} as Game;

      const response = await api.get('/api/update', {
        params: {
          matchID: gameId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response;
      return data;
    },
    initialData: {} as Game,
  };
};

export const dealCardsMutation = (token: string) => {
  return {
    mutationFn: async (gameId: string): Promise<void> => {
      if (!gameId) throw new Error('Game ID is required');

      try {
        await api.post(
          '/api/deal',
          { matchID: gameId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to deal cards');
      }
    },
  };
};

export const finishRoundMutation = (token: string) => {
  return {
    mutationFn: async (gameId: string): Promise<void> => {
      if (!gameId) throw new Error('Game ID is required');
      try {
        await api.put(
          '/api/finish-round',
          { matchID: gameId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch (error) {
        throw new Error(
          error.response?.data?.error || 'Failed to finish round',
        );
      }
    },
  };
};

export const playMutation = (token: string) => {
  return {
    mutationFn: async (id: string): Promise<void> => {
      try {
        await api.post(
          '/api/play',
          {
            playerCardId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch (error) {
        // ignore error
      }
    },
  };
};

/**
 * @todo MUDAR O INSERT PARA A API PARA CONTROLAR A QUANTIDADE DE APOSTAS
 * @returns void
 */
export const betMutation = () => {
  return {
    mutationFn: async (payload: BetInsert): Promise<void> => {
      const { error } = await supabase.from('bets').insert({
        match_id: payload.match_id,
        round_number: payload.round_number,
        bet: payload.bet,
      });

      if (error) {
        throw error;
      }
    },
  };
};

export const getTrumps = (
  gameId: string,
  roundNumber: number,
  token: string,
) => {
  return {
    queryKey: trumpKey(gameId, roundNumber),
    queryFn: async (): Promise<Deck[]> => {
      const response = await api.get('api/trumps', {
        params: {
          matchID: gameId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    initialData: [],
  };
};
