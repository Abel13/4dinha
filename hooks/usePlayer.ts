import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getPlayer } from '@/services/player';

export const usePlayer = (playerId: string) => {
  const [playerName, setPlayerName] = useState<string | null>('');
  const [playerPicture, setPlayerPicture] = useState<string | null>('');

  const { data: player } = useQuery({
    ...getPlayer(playerId),
    enabled: playerId !== '',
  });

  useEffect(() => {
    if (player) {
      setPlayerName(player.username);
      setPlayerPicture(player.avatar_svg);
    }
  }, [player]);

  return { playerName, playerPicture };
};
