import { supabase } from '@/providers/supabase';
import { createMatchService, fetchMatches } from '@/services/match';
import { enterMatchService } from '@/services/matchUsers';
import { MatchInsert } from '@/types/Match';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useMatchList = () => {
  const router = useRouter();
  const [creatingMatch, setCreatingMatch] = useState<boolean>(false);

  const {
    data: matches,
    isLoading: loadingMatches,
    refetch,
  } = useQuery({
    ...fetchMatches(),
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

  const enterMatch = useCallback(async (matchId: string) => {
    enterMatchMutation.mutate({ matchId });
  }, []);

  const createMatch = useCallback(async (formData: MatchInsert) => {
    setCreatingMatch(true);
    createMatchMutation.mutate(formData);
  }, []);

  const fetchInProgressMatch = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('match_users')
        .select(
          `
            user_id,
            match_id,
            matches!inner(*)
          `,
        )
        .eq('user_id', userId)
        .eq('matches.status', 'started')
        .limit(1)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (data && data.matches) {
        router.replace({
          pathname: '/(game)/4dinha',
          params: {
            gameId: data.matches.id,
          },
        });
      }
    } catch (e) {
      // ignore error
    }
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
        () => {
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
    fetchInProgressMatch,
    loadingMatches,
    creatingMatch,
    matches,
  };
};
