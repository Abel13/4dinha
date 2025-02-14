import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { ThemedView } from './ThemedView';
import { TablePlayer } from './TablePlayer';
import { TableCards } from './TableCards';

import { usePlayer } from '@/hooks/usePlayer';
import { useVibration } from '@/hooks/useVibration';
import { useGamePositions } from '@/hooks/useTableSeat';

import type { GamePlayer } from '@/types';

export interface TableSeatProps {
  player?: GamePlayer;
  number: number;
  playing?: boolean;
  currentTurn: number;
  handlePlay?: (id?: string) => void;
}

export function TableSeat({
  player,
  number,
  playing,
  currentTurn,
  handlePlay,
}: TableSeatProps) {
  const { formatBet, getPlayerPosition } = useGamePositions();
  const { playerName, playerPicture } = usePlayer(player?.user_id as string);
  const isMyTurn = (player?.current && number === 1) || false;
  const { vibrate } = useVibration();

  useEffect(() => {
    if (isMyTurn) {
      vibrate();
    }
  }, [isMyTurn, vibrate]);

  if (!player?.user_id)
    return <ThemedView style={[styles.seat, styles.empty]} />;

  return (
    <ThemedView style={[styles.seat, styles.row]}>
      <ThemedView style={[styles.playerPosition, getPlayerPosition(number)]}>
        <TablePlayer
          player={{
            name: playerName,
            bet: formatBet(player.wins, player.bet),
            playerPicture,
            lives: player.lives,
            dealer: player.dealer,
            number,
          }}
        />
      </ThemedView>

      <TableCards
        player={player}
        number={number}
        playing={playing}
        currentTurn={currentTurn}
        handlePlay={handlePlay}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  seat: {
    flex: 1,
  },
  empty: {
    borderColor: 'transparent',
  },
  row: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  playerPosition: {
    position: 'absolute',
    zIndex: 20,
    width: 120,
  },
});
