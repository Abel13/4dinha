import { supabase } from '@/providers/supabase';
import { fetchMatch, startMatchService } from '@/services/match';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

export const useMatch = (matchId: string) => {
  const router = useRouter();
  const [creatingMatch, setCreatingMatch] = useState<boolean>(false);

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

  useEffect(() => {
    console.log('CREATE CHANNEL', matchId);
    const channel = supabase
      .channel('matches_channel')
      .on(
        'postgres_changes',
        {
          schema: 'public',
          table: 'matches',
          event: 'UPDATE',
          filter: `id=eq.${matchId}`,
        },
        (payload) => {
          console.log(payload, matchId);
          if (payload.new.status === 'started') {
            router.replace('/(game)/4dinha/table');
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
    match,
    matchPicture,
    creatingMatch,
  };
};
