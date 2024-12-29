import { supabase } from '@/providers/supabase';
import { createMatchService, fetchMatch, fetchMatches } from '@/services/match';
import { enterMatchService } from '@/services/matchUsers';
import { Match, MatchInsert } from '@/types/Match';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useMatch = (matchId?: string) => {
  const router = useRouter();
  const [creatingMatch, setCreatingMatch] = useState<boolean>(false);

  const {
    data: matches,
    isLoading: loadingMatches,
    refetch,
  } = useQuery({
    ...fetchMatches(),
    enabled: !matchId,
  });

  const { data: match } = useQuery({
    ...fetchMatch(matchId || ''),
    enabled: matchId !== undefined && matchId.length > 0,
  });

  const enterMatchMutation = useMutation({
    mutationFn: enterMatchService,
    onSuccess: (matchId) => {
      if (matchId)
        router.navigate({
          pathname: '/lobby/[matchId]',
          params: {
            matchId,
          },
        });
    },
  });

  const createMatchMutation = useMutation({
    mutationFn: createMatchService,
    onSuccess: async (matchId) => {
      if (matchId) {
        enterMatchMutation.mutate({ matchId });
      }

      setCreatingMatch(false);
    },
    onError: () => {
      setCreatingMatch(false);
      Alert.alert('FALHA', 'Erro ao criar partida!');
    },
  });

  const startMatchMutation = useMutation({
    mutationFn: startMatchService,
    onSuccess: () => {},
    onError: () => {},
  });

  const startMatch = useCallback(async () => {
    startMatchMutation.mutate(matchId);
  }, []);

  const enterMatch = useCallback(async (matchId: string) => {
    enterMatchMutation.mutate({ matchId });
  }, []);

  const createMatch = useCallback(async (formData: MatchInsert) => {
    setCreatingMatch(true);
    createMatchMutation.mutate(formData);
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel('matches_channel')
      .on(
        'postgres_changes',
        {
          schema: 'public',
          table: 'matches',
          event: 'INSERT',
        },
        () => {
          refetch();
        },
      )
      .on(
        'postgres_changes',
        {
          schema: 'public',
          table: 'matches',
          event: 'UPDATE',
        },
        (payload) => {
          refetch();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [matches]);

  return {
    createMatch,
    enterMatch,
    startMatch,
    match,
    loadingMatches,
    creatingMatch,
    matches,
  };
};
