import { supabase } from '@/providers/supabase';
import {
  createMatchService,
  fetchInProgressMatch,
  fetchMatches,
} from '@/services/match';
import { enterMatchService } from '@/services/matchUsers';
import { MatchInsert } from '@/types/Match';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useUserSessionStore } from './useUserSessionStore';

export const useMatchList = () => {
  const router = useRouter();
  const [creatingMatch, setCreatingMatch] = useState<boolean>(false);
  const { session } = useUserSessionStore();

  const {
    data: matches,
    isLoading: loadingMatches,
    refetch,
  } = useQuery({
    ...fetchMatches(),
  });

  const { data: inProgressMatches, refetch: refetchMyMatches } = useQuery({
    ...fetchInProgressMatch(session?.user?.id || ''),
  });

  const enterMatchMutation = useMutation({
    mutationFn: enterMatchService,
    onSuccess: (matchId) => {
      if (matchId)
        router.push({
          pathname: '/lobby/[matchId]',
          params: {
            matchId,
          },
        });
    },
  });

  const createMatchUserMutation = useMutation({
    mutationFn: enterMatchService,
    onSuccess: (matchId) => {
      if (matchId)
        router.dismissTo({
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
        createMatchUserMutation.mutate({ matchId });
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
          refetchMyMatches();
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
    loadingMatches,
    creatingMatch,
    matches,
    inProgressMatches,
    refetchMyMatches,
  };
};
