import { supabase } from '@/providers/supabase';
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  dealCardsMutation,
  updateGame,
  betMutation,
  playMutation,
  getTrumps,
  finishRoundMutation,
} from '@/services/game';
import { Bet, GamePlayer } from '@/types';
import { useUserSessionStore } from './useUserSessionStore';
import useBet from './useBet';

export const useGame = (matchId: string) => {
  const { session, loadSession } = useUserSessionStore();
  const { mutate: mutateDealCards } = useMutation(
    dealCardsMutation(session?.access_token as string),
  );
  const { mutate: mutateFinishRound } = useMutation(
    finishRoundMutation(session?.access_token as string),
  );
  const { mutate: mutatePlay } = useMutation(
    playMutation(session?.access_token as string),
  );
  const { mutate: mutateBet } = useMutation(betMutation());
  const [dealing, setDealing] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [betting, setBetting] = useState<boolean>(false);
  const [turn, setTurn] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<'indiozinho' | 'end' | null>(
    null,
  );

  const [me, setMe] = useState<GamePlayer>();
  const [player2, setPlayer2] = useState<GamePlayer>();
  const [player3, setPlayer3] = useState<GamePlayer>();
  const [player4, setPlayer4] = useState<GamePlayer>();
  const [player5, setPlayer5] = useState<GamePlayer>();
  const [player6, setPlayer6] = useState<GamePlayer>();

  const [winner, setWinner] = useState<GamePlayer>();

  const [checkLimit, setCheckLimit] = useState(false);

  const {
    data: game,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    ...updateGame(matchId as string, session?.access_token as string),
    enabled: matchId !== '',
  });

  useEffect(() => {
    if (error) {
      loadSession();
    }
  }, [error]);

  const roundNumber = game?.round?.round_number || -1;

  const { data: trumps } = useQuery({
    ...getTrumps(
      matchId as string,
      roundNumber,
      session?.access_token as string,
    ),
    enabled: roundNumber > 0,
  });

  const refreshGame = useCallback(() => {
    refetch();
  }, [game]);

  const handleFinishRound = useCallback(() => {
    // setFinishing(true);
    mutateFinishRound(matchId, {
      onSuccess: () => {
        setDealing(false);
      },
      onError: () => {
        setDealing(false);
      },
    });
  }, []);

  const handleDeal = useCallback(() => {
    setDealing(true);
    mutateDealCards(matchId, {
      onSuccess: () => {
        setDealing(false);
      },
      onError: () => {
        setDealing(false);
      },
    });
  }, []);

  const handlePlay = useCallback(
    async (id: string) => {
      if (me?.current) {
        setPlaying(true);
        mutatePlay(id, {
          onSuccess: () => {
            setPlaying(false);
          },
          onError: () => {
            setPlaying(false);
          },
        });
      } else console.log('CALMA CARAIO');
    },
    [game, me],
  );

  const getEmoji = useCallback(
    (
      status?:
        | 'dealing'
        | 'betting'
        | 'playing'
        | 'finished'
        | 'loading'
        | 'indiozinho',
    ) => {
      switch (status) {
        case 'betting':
          return '💵';
        case 'playing':
          return '🎮';
        case 'loading':
          return '⏳';
        case 'finished':
          return '🏁';
        case 'indiozinho':
          return '🏹';
        default:
          return '🎰';
      }
    },
    [],
  );

  const getCardQuantity = useCallback((roundNumber: number) => {
    if (roundNumber <= 0) return undefined;

    const lastDigit = roundNumber % 10;

    if (lastDigit == 0) {
      return 2;
    }
    if (lastDigit <= 6) {
      return lastDigit;
    }

    return 12 - lastDigit;
  }, []);

  const cardQuantity = getCardQuantity(roundNumber);

  const sumBets = (itemArray: Bet[]) =>
    itemArray &&
    itemArray.reduce(function (a, b) {
      return a + b.bet;
    }, 0);

  const betCount = sumBets(game?.bets);

  const { bet, max, add, subtract } = useBet(
    betCount,
    cardQuantity,
    checkLimit,
  );

  const handleBet = useCallback(() => {
    setBetting(true);
    mutateBet(
      { match_id: matchId, round_number: roundNumber, bet },
      {
        onError: () => {
          setBetting(false);
        },
        onSuccess: () => {
          setBetting(false);
        },
      },
    );
  }, [game, bet, roundNumber, matchId]);

  useEffect(() => {
    if (game.players?.length > 0) {
      const { players } = game;
      const me = players.find((player) => player.user_id === session?.user?.id);

      if (cardQuantity) setCheckLimit(!!me?.dealer && betCount <= cardQuantity);

      const player2 = players.find(
        (player) => player.table_seat === ((me?.table_seat || 0) + 1) % 6,
      );
      const player3 = players.find(
        (player) => player.table_seat === ((me?.table_seat || 0) + 2) % 6,
      );
      const player4 = players.find(
        (player) => player.table_seat === ((me?.table_seat || 0) + 3) % 6,
      );
      const player5 = players.find(
        (player) => player.table_seat === ((me?.table_seat || 0) + 4) % 6,
      );
      const player6 = players.find(
        (player) => player.table_seat === ((me?.table_seat || 0) + 5) % 6,
      );

      setMe({
        ...me,
        cards: game.player_cards.filter((p) => p.user_id === me?.user_id),
        bet: game.bets.find((p) => p.user_id === me?.user_id)?.bet,
        wins: game?.results?.find((r) => r.user_id === me?.user_id)?.wins,
      } as GamePlayer);

      setPlayer2({
        ...player2,
        cards: game.player_cards.filter((p) => p.user_id === player2?.user_id),
        bet: game.bets.find((p) => p.user_id === player2?.user_id)?.bet,
        wins: game?.results?.find((r) => r.user_id === player2?.user_id)?.wins,
      } as GamePlayer);
      setPlayer3({
        ...player3,
        cards: game.player_cards.filter((p) => p.user_id === player3?.user_id),
        bet: game.bets.find((p) => p.user_id === player3?.user_id)?.bet,
        wins: game?.results?.find((r) => r.user_id === player3?.user_id)?.wins,
      } as GamePlayer);
      setPlayer4({
        ...player4,
        cards: game.player_cards.filter((p) => p.user_id === player4?.user_id),
        bet: game.bets.find((p) => p.user_id === player4?.user_id)?.bet,
        wins: game?.results?.find((r) => r.user_id === player4?.user_id)?.wins,
      } as GamePlayer);
      setPlayer5({
        ...player5,
        cards: game.player_cards.filter((p) => p.user_id === player5?.user_id),
        bet: game.bets.find((p) => p.user_id === player5?.user_id)?.bet,
        wins: game?.results?.find((r) => r.user_id === player5?.user_id)?.wins,
      } as GamePlayer);
      setPlayer6({
        ...player6,
        cards: game.player_cards.filter((p) => p.user_id === player6?.user_id),
        bet: game.bets.find((p) => p.user_id === player6?.user_id)?.bet,
        wins: game?.results?.find((r) => r.user_id === player6?.user_id)?.wins,
      } as GamePlayer);

      if (game.player_cards) {
        const turn = Math.max(...game.player_cards.map((r) => r.turn));
        setTurn(turn);
      }
    }

    if (game?.players?.length === 2) {
      // setCurrentPage('indiozinho');
      return;
    }

    if (game?.players?.length === 1) {
      const winner = game.players.find((p) => p.lives > 0);
      setWinner(winner);
      setCurrentPage('end');
      return;
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
          refreshGame();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [game]);

  return {
    me,
    player2,
    player3,
    player4,
    player5,
    player6,
    dealing,
    betting,
    playing,
    isLoading,
    isFetching,
    roundStatus: game?.round?.status,
    trump: {
      symbol: game?.round?.trump_symbol,
      suit: game?.round?.trump_suit,
    },
    results: game?.results,
    trumps,
    bet,
    betCount,
    turn,
    max,
    cardQuantity,
    roundNumber,
    checkLimit,
    currentPage,
    winner,
    add,
    subtract,
    handleDeal,
    handlePlay,
    handleBet,
    handleFinishRound,
    refreshGame,
    getEmoji,
  };
};
