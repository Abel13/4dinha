import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getPlayer } from '@/services/player';
import { useDiceBear } from './useDiceBear';

export const usePlayer = (playerId: string) => {
  const getAvatar = useDiceBear();

  const [playerName, setPlayerName] = useState<string | null>('');
  const [playerPicture, setPlayerPicture] = useState<string | null>('');

  const { data: player } = useQuery({
    ...getPlayer(playerId),
    enabled: playerId !== '',
  });

  useEffect(() => {
    if (player) {
      setPlayerName(player.email.substring(0, player.email.indexOf('@')));
      setPlayerPicture(
        getAvatar({
          version: 7,
          avatar: 'bottts-neutral',
          seed: player.email,
        }),
      );
    }
  }, [player]);

  return { playerName, playerPicture };
};
