import { supabase } from '@/providers/supabase';
import {
  endMatchService,
  fetchMatch,
  startMatchService,
} from '@/services/match';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

export const useMatch = (matchId: string) => {
  const router = useRouter();

  const { data: match } = useQuery({
    ...fetchMatch(matchId || ''),
    enabled: matchId.length > 0,
  });

  const matchPicture = match
    ? `https://api.dicebear.com/9.x/icons/png?seed=${match?.id}&scale=90`
    : null;

  const startMatchMutation = useMutation({
    mutationFn: startMatchService,
    onSuccess: () => {},
    onError: () => {},
  });

  const startMatch = useCallback(async () => {
    startMatchMutation.mutate(matchId as string);
  }, []);

  const endMatchMutation = useMutation({
    mutationFn: endMatchService,
    onSuccess: () => {},
    onError: () => {},
  });

  const endMatch = useCallback(async () => {
    endMatchMutation.mutate(matchId as string);
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel('match_channel')
      .on(
        'postgres_changes',
        {
          schema: 'public',
          table: 'matches',
          event: 'UPDATE',
          filter: `id=eq.${matchId}`,
        },
        (payload) => {
          if (payload.new.status === 'started') {
            router.replace({
              pathname: '/(game)/4dinha',
              params: {
                gameId: payload.new.id,
              },
            });
          }

          if (payload.new.status === 'end') {
            router.replace({
              pathname: '/',
              params: {
                gameId: payload.new.id,
              },
            });
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [matchId]);

  return {
    startMatch,
    endMatch,
    match,
    matchPicture,
  };
};
