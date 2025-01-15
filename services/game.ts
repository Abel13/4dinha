import { Game } from '@/types';
import { api } from './api';

export const gameKey = (gameId: string) => {
  return ['game', gameId];
};

export const updateGame = (gameId: string, token: string) => {
  return {
    queryKey: gameKey(gameId),
    queryFn: async (): Promise<Game> => {
      if (!gameId) return {} as Game;

      try {
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
      } catch (error) {
        return {} as Game;
      }
    },
    initialData: {} as Game,
  };
};

export const dealCards = (token: string) => {
  return {
    mutationFn: async (gameId: string): Promise<void> => {
      if (!gameId) throw new Error('Game ID is required');

      try {
        const response = await api.post(
          '/api/deal',
          { matchID: gameId }, // Corpo da requisição
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
