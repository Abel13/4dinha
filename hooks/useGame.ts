import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/providers/supabase';
import {
  dealCardsMutation,
  updateGame,
  betMutation,
  getTrumps,
  finishRoundMutation,
  usePlayMutation,
} from '@/services/game';
import { Game, type Bet, type GamePlayer } from '@/types';
import { NotificationFeedbackType } from 'expo-haptics';
import { useUserSessionStore } from './useUserSessionStore';
import { useSound } from './useAudioConfig';
import { useHaptics } from './useHaptics';
import { RoundStatus } from '@/types/Round';

export const useGame = (matchId: string) => {
  const { session, loadSession } = useUserSessionStore();
  const { mutate: mutateDealCards } = useMutation(
    dealCardsMutation(session?.access_token || ''),
  );
  const { mutate: mutateFinishRound } = useMutation(
    finishRoundMutation(session?.access_token || ''),
  );
  const { mutate: mutatePlay } = useMutation(
    usePlayMutation(session?.access_token || ''),
  );
  const { mutate: mutateBet } = useMutation(betMutation());
  const [dealing, setDealing] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [betting, setBetting] = useState<boolean>(false);
  const [finishing, setFinishing] = useState<boolean>(false);

  const [turn, setTurn] = useState<number>(1);
  const [roundStatus, setRoundStatus] = useState<RoundStatus>();
  const [currentPage, setCurrentPage] = useState<'indiozinho' | 'end' | null>(
    null,
  );

  const [me, setMe] = useState<GamePlayer>();
  const [currentPlayer, setCurrentPlayer] = useState<GamePlayer>();
  const [indiozinho1, setIndiozinho1] = useState<GamePlayer>();
  const [indiozinho2, setIndiozinho2] = useState<GamePlayer>();
  const [player2, setPlayer2] = useState<GamePlayer>();
  const [player3, setPlayer3] = useState<GamePlayer>();
  const [player4, setPlayer4] = useState<GamePlayer>();
  const [player5, setPlayer5] = useState<GamePlayer>();
  const [player6, setPlayer6] = useState<GamePlayer>();

  const [winner, setWinner] = useState<GamePlayer>();

  const [checkLimit, setCheckLimit] = useState(false);
  const { playSound: playCardSound } = useSound('card');
  const { playSound: playNegativeTouch } = useSound('negativeTouch');
  const { playSound: playCurrentPlayer } = useSound('currentPlayer');
  const { playSound: playChangePlayer } = useSound('changePlayer');

  const { notification } = useHaptics();

  // aguardando ação do usuário
  const waitingAction = (me?.dealer && !roundStatus) || me?.current;

  const {
    data: game,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    ...updateGame(matchId, session?.access_token || ''),
    enabled: matchId !== '' && !waitingAction,
    refetchOnReconnect: 'always',
    refetchOnMount: 'always',
    refetchInterval: 5000,
    initialData: {} as Game,
  });

  const turnStatus =
    game?.players?.length -
      game?.player_cards?.filter((c) => c.turn === turn)?.length || 0;
  const roundNumber = game?.round?.round_number || -1;

  useEffect(() => {
    if (error) {
      loadSession();
    }
  }, [error, loadSession]);

  const { data: trumps } = useQuery({
    ...getTrumps(matchId, roundNumber, session?.access_token || ''),
    enabled: roundNumber > 0,
  });

  const refreshGame = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleFinishRound = useCallback(() => {
    setFinishing(true);
    mutateFinishRound(matchId, {
      onSuccess: () => {
        setFinishing(false);
      },
      onError: () => {
        setFinishing(false);
      },
    });
  }, [matchId, mutateFinishRound]);

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
  }, [matchId, mutateDealCards]);

  const handlePlay = useCallback(
    async (id: string) => {
      if (me?.current) {
        setPlaying(true);
        playCardSound({});

        mutatePlay(id, {
          onSuccess: () => {
            notification(NotificationFeedbackType.Success);
            setPlaying(false);
          },
          onError: () => {
            setPlaying(false);
          },
        });
      } else {
        playNegativeTouch({});
        notification(NotificationFeedbackType.Error);
      }
    },
    [me, mutatePlay, notification, playCardSound, playNegativeTouch],
  );

  const getCardQuantity = useCallback((num: number) => {
    if (num <= 0) return undefined;

    const lastDigit = num % 10;

    if (lastDigit === 0) {
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
    itemArray.reduce((a, b) => {
      return a + b.bet;
    }, 0);

  const betCount = sumBets(game?.bets);

  const handleBet = useCallback(
    (bet: number) => {
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
    },
    [mutateBet, matchId, roundNumber],
  );

  useEffect(() => {
    setRoundStatus(game?.round?.status);
  }, [game.round]);

  useEffect(() => {
    if (currentPlayer) {
      if (currentPlayer.id === me?.id) {
        playCurrentPlayer({});
        return;
      }
      playChangePlayer({});
    }
  }, [currentPlayer]);

  useEffect(() => {
    if (game.players?.length >= 2) {
      const { players } = game;
      const user = players.find(
        (player) => player.user_id === session?.user?.id,
      );
      const current = players.find((p) => p?.current);

      setMe({
        ...user,
        cards: game.player_cards.filter((p) => p.user_id === user?.user_id),
        bet: game.bets.find((p) => p.user_id === user?.user_id)?.bet,
        wins: game?.results?.find((r) => r.user_id === user?.user_id)?.wins,
      } as GamePlayer);

      if (cardQuantity)
        setCheckLimit(!!user?.dealer && betCount <= cardQuantity);

      const newPlayer2 = players.find(
        (player) =>
          player.table_seat === (((me?.table_seat || 0) + 1 - 1) % 6) + 1,
      );
      const newPlayer3 = players.find(
        (player) =>
          player.table_seat === (((me?.table_seat || 0) + 2 - 1) % 6) + 1,
      );
      const newPlayer4 = players.find(
        (player) =>
          player.table_seat === (((me?.table_seat || 0) + 3 - 1) % 6) + 1,
      );
      const newPlayer5 = players.find(
        (player) =>
          player.table_seat === (((me?.table_seat || 0) + 4 - 1) % 6) + 1,
      );
      const newPlayer6 = players.find(
        (player) =>
          player.table_seat === (((me?.table_seat || 0) + 5 - 1) % 6) + 1,
      );

      setPlayer2({
        ...newPlayer2,
        cards: game.player_cards.filter(
          (p) => p.user_id === newPlayer2?.user_id,
        ),
        bet: game.bets.find((p) => p.user_id === newPlayer2?.user_id)?.bet,
        wins: game?.results?.find((r) => r.user_id === newPlayer2?.user_id)
          ?.wins,
      } as GamePlayer);
      setPlayer3({
        ...newPlayer3,
        cards: game.player_cards.filter(
          (p) => p.user_id === newPlayer3?.user_id,
        ),
        bet: game.bets.find((p) => p.user_id === newPlayer3?.user_id)?.bet,
        wins: game?.results?.find((r) => r.user_id === newPlayer3?.user_id)
          ?.wins,
      } as GamePlayer);
      setPlayer4({
        ...newPlayer4,
        cards: game.player_cards.filter(
          (p) => p.user_id === newPlayer4?.user_id,
        ),
        bet: game.bets.find((p) => p.user_id === newPlayer4?.user_id)?.bet,
        wins: game?.results?.find((r) => r.user_id === newPlayer4?.user_id)
          ?.wins,
      } as GamePlayer);
      setPlayer5({
        ...newPlayer5,
        cards: game.player_cards.filter(
          (p) => p.user_id === newPlayer5?.user_id,
        ),
        bet: game.bets.find((p) => p.user_id === newPlayer5?.user_id)?.bet,
        wins: game?.results?.find((r) => r.user_id === newPlayer5?.user_id)
          ?.wins,
      } as GamePlayer);
      setPlayer6({
        ...newPlayer6,
        cards: game.player_cards.filter(
          (p) => p.user_id === newPlayer6?.user_id,
        ),
        bet: game.bets.find((p) => p.user_id === newPlayer6?.user_id)?.bet,
        wins: game?.results?.find((r) => r.user_id === newPlayer6?.user_id)
          ?.wins,
      } as GamePlayer);

      if (game.player_cards) {
        const newTurn = Math.max(...game.player_cards.map((r) => r.turn));
        setTurn(newTurn);
      }

      setCurrentPlayer(current);
      return;
    }

    // INDIOZINHO
    if (game?.players?.length === 2) {
      setCurrentPage('indiozinho');
      const { players } = game;
      const user = players.find(
        (player) => player.user_id === session?.user?.id,
      );
      setMe({
        ...user,
        cards: game.player_cards.filter((p) => p.user_id === user?.user_id),
        bet: game.bets.find((p) => p.user_id === user?.user_id)?.bet,
        wins: game?.results?.find((r) => r.user_id === user?.user_id)?.wins,
      } as GamePlayer);

      let firstIndiozinho = user;
      if (!firstIndiozinho) {
        [firstIndiozinho] = game.players.sort((i) => i.table_seat);
      }

      setIndiozinho1({
        ...firstIndiozinho,
        cards: game.player_cards.filter(
          (p) => p.user_id === indiozinho1?.user_id,
        ),
        bet: game.bets.find((p) => p.user_id === indiozinho1?.user_id)?.bet,
        wins: game?.results?.find((r) => r.user_id === indiozinho1?.user_id)
          ?.wins,
      } as GamePlayer);

      setIndiozinho2({
        ...game.players.find((p) => p.user_id !== indiozinho1?.user_id),
        cards: game.player_cards.filter(
          (p) => p.user_id === indiozinho2?.user_id,
        ),
        bet: game.bets.find((p) => p.user_id === indiozinho2?.user_id)?.bet,
        wins: game?.results?.find((r) => r.user_id === indiozinho2?.user_id)
          ?.wins,
      } as GamePlayer);

      if (cardQuantity) setCheckLimit(!!me?.dealer && betCount <= cardQuantity);

      return;
    }

    // VENCEDOR
    if (game?.players?.length <= 1) {
      setWinner(game.players?.find((p) => p.lives > 0));
      setCurrentPage('end');
    }
  }, [
    betCount,
    cardQuantity,
    game,
    indiozinho1?.user_id,
    indiozinho2?.user_id,
    me?.dealer,
    me?.table_seat,
    session?.user?.id,
  ]);

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
  }, [game, matchId, refreshGame]);

  return {
    me,
    currentPlayer,
    player2,
    player3,
    player4,
    player5,
    player6,
    indiozinho1,
    indiozinho2,
    dealing,
    betting,
    playing,
    isLoading,
    isFetching,
    roundStatus,
    trump: {
      symbol: game?.round?.trump_symbol,
      suit: game?.round?.trump_suit,
    },
    results: game?.results,
    trumps,
    betCount,
    turn,
    turnStatus,
    cardQuantity,
    roundNumber,
    checkLimit,
    currentPage,
    winner,
    finishing,
    handleDeal,
    handlePlay,
    handleBet,
    handleFinishRound,
    refreshGame,
  };
};
