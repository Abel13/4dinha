import { getPlayer } from '@/services/player';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const usePlayer = (playerId: string) => {
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [playerPicture, setPlayerPicture] = useState<string | null>(null);

  const { data: player } = useQuery({
    ...getPlayer(playerId),
    enabled: playerId.length > 0,
  });

  useEffect(() => {
    if (player) {
      setPlayerName(player.email.substring(0, player.email.indexOf('@')));
      setPlayerPicture(
        `https://api.dicebear.com/7.x/bottts-neutral/png?seed=${player.email}&scale=90`,
      );
    }
  }, [player]);

  return { playerName, playerPicture };
};
