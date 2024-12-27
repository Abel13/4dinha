import { supabase } from '@/providers/supabase';
import { fetchMatchUsers } from '@/services/matchUsers';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useMatchUsers = (matchId: string) => {
  const {
    data: players,
    isLoading: loadingLobby,
    refetch,
  } = useQuery({
    ...fetchMatchUsers(matchId),
    enabled: matchId.length > 0,
  });

  useEffect(() => {
    const channel = supabase
      .channel('lobby_channel')
      .on(
        'postgres_changes',
        {
          schema: 'public',
          table: 'match_users',
          event: 'INSERT',
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
  };
};
