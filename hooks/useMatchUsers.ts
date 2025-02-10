import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { supabase } from '@/providers/supabase';
import { fetchMatchUsers, updateStatusService } from '@/services/matchUsers';

export const useMatchUsers = (matchId: string) => {
  const {
    data: players,
    isLoading: loadingLobby,
    refetch,
  } = useQuery({
    ...fetchMatchUsers(matchId),
    enabled: matchId.length > 0,
  });

  const updateStatusMutation = useMutation({
    mutationFn: updateStatusService,
    onSuccess: () => {},
    onError: () => {},
  });

  const updateStatus = useCallback(
    async (id: string, isReady: boolean) => {
      await updateStatusMutation.mutate({
        _is_ready: isReady,
        _match_id: id,
      });
    },
    [updateStatusMutation],
  );

  useEffect(() => {
    const channel = supabase
      .channel('lobby_channel')
      .on(
        'postgres_changes',
        {
          schema: 'public',
          table: 'match_users',
          event: 'INSERT',
          filter: `match_id=eq.${matchId}`,
        },
        () => {
          refetch();
        },
      )
      .on(
        'postgres_changes',
        {
          schema: 'public',
          table: 'match_users',
          event: 'UPDATE',
          filter: `match_id=eq.${matchId}`,
        },
        () => {
          refetch();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [players]);

  return {
    players,
    loadingLobby,
    updateStatus,
  };
};
