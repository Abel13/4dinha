import { supabase } from '@/providers/supabase';
import { useCallback, useEffect, useState } from 'react';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { dealCards, gameKey, updateGame } from '@/services/game';
import { GamePlayer } from '@/types';
import { useUserSessionStore } from './useUserSessionStore';
import { RoundStatus } from '@/types/Round';

export const useGame = (matchId: string) => {
  const { session } = useUserSessionStore();
  const [dealing, setDealing] = useState<boolean>(false);

  const queryClient = new QueryClient();
  const { mutate } = useMutation(dealCards(session?.access_token as string));

  const [me, setMe] = useState<GamePlayer>();
  const [player2, setPlayer2] = useState<GamePlayer>();
  const [player3, setPlayer3] = useState<GamePlayer>();
  const [player4, setPlayer4] = useState<GamePlayer>();
  const [player5, setPlayer5] = useState<GamePlayer>();
  const [player6, setPlayer6] = useState<GamePlayer>();

  const [roundStatus, setRoundStatus] = useState<RoundStatus>('dealing');

  const {
    data: game,
    isLoading,
    isFetching,
  } = useQuery({
    ...updateGame(matchId as string, session?.access_token as string),
    enabled: matchId !== '',
  });

  const refreshGame = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: gameKey(matchId),
    });
  }, []);

  const handleDeal = useCallback(() => {
    setDealing(true);
    mutate(matchId, {
      onSuccess: () => {
        setDealing(false);
      },
      onError: () => {
        setDealing(false);
      },
    });
  }, []);

  useEffect(() => {
    setRoundStatus(game.round?.status || 'dealing');
    if (game.players?.length > 0) {
      const { players } = game;
      const me = players.find((player) => player.user_id === session?.user?.id);

      const player2 = players.find(
        (player) => player.table_sit === ((me?.table_sit || 0) + 1) % 6,
      );
      const player3 = players.find(
        (player) => player.table_sit === ((me?.table_sit || 0) + 2) % 6,
      );
      const player4 = players.find(
        (player) => player.table_sit === ((me?.table_sit || 0) + 3) % 6,
      );
      const player5 = players.find(
        (player) => player.table_sit === ((me?.table_sit || 0) + 4) % 6,
      );
      const player6 = players.find(
        (player) => player.table_sit === ((me?.table_sit || 0) + 5) % 6,
      );

      setMe({
        ...me,
        cards: game.player_cards.filter((p) => p.user_id === me?.user_id),
      } as GamePlayer);

      setPlayer2({
        ...player2,
        cards: game.player_cards.filter((p) => p.user_id === player2?.user_id),
      } as GamePlayer);
      setPlayer3({
        ...player3,
        cards: game.player_cards.filter((p) => p.user_id === player3?.user_id),
      } as GamePlayer);
      setPlayer4({
        ...player4,
        cards: game.player_cards.filter((p) => p.user_id === player4?.user_id),
      } as GamePlayer);
      setPlayer5({
        ...player5,
        cards: game.player_cards.filter((p) => p.user_id === player5?.user_id),
      } as GamePlayer);
      setPlayer6({
        ...player6,
        cards: game.player_cards.filter((p) => p.user_id === player6?.user_id),
      } as GamePlayer);
    }
  }, [game]);

  useEffect(() => {
    const channel = supabase
      .channel('game')
      .on(
        'postgres_changes',
        {
          schema: 'public',
          table: 'match_actions',
          event: 'INSERT',
          filter: `match_id=eq.${matchId}`,
        },
        () => {
          console.log('REFETCHING');
          queryClient.invalidateQueries({
            queryKey: gameKey(matchId),
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    me,
    player2,
    player3,
    player4,
    player5,
    player6,
    dealing,
    roundStatus,
    isLoading,
    isFetching,
    handleDeal,
    refreshGame,
  };
};
