import { Colors } from '@/constants/Colors';
import { ThemedView } from './ThemedView';
import { Image, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { usePlayer } from '@/hooks/usePlayer';
import { GamePlayer } from '@/types';
import { Card } from './Card';
import { useCallback } from 'react';

const styles = StyleSheet.create({
  seat: {
    flex: 1,
    minWidth: '45%',
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.dark.tint,
    borderRadius: 10,
    padding: 5,
  },
  current: {
    borderColor: Colors.dark.success,
    shadowColor: Colors.dark.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  row: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  number: {
    alignSelf: 'flex-start',
    textAlign: 'center',
    width: 35,
    height: 35,
    padding: 5,
    fontSize: 14,
    borderRadius: 18,
    backgroundColor: Colors.dark.tint,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 18,
  },
});

export const TableSeat = ({
  player,
  number,
  playing,
  handlePlay,
}: {
  player?: GamePlayer;
  number: number;
  playing?: boolean;
  handlePlay?: (id: string) => Promise<void>;
}) => {
  const { playerName, playerPicture } = usePlayer(player?.user_id as string);

  if (!player?.user_id)
    return (
      <ThemedView style={styles.seat}>
        <ThemedView style={styles.row}>
          <ThemedText style={styles.number}>{number}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.row} />
        <ThemedView style={styles.row}></ThemedView>
      </ThemedView>
    );

  return (
    <ThemedView style={[styles.seat, player.current && styles.current]}>
      <ThemedView style={styles.row}>
        <ThemedView style={styles.row}>
          {playerPicture && (
            <Image
              source={{
                uri: playerPicture as string,
              }}
              style={styles.profileImage}
            />
          )}
          <ThemedText type='default'>{playerName}</ThemedText>
        </ThemedView>
        <ThemedText type='subtitle'>{`🎲 ${Number.isNaN(Number(player.bet)) ? '-' : player.bet}/-`}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.row}>
        {player.cards &&
          player.cards.map((card) => {
            return (
              <Card
                key={card.id}
                id={card.id}
                suit={card.suit}
                symbol={card.symbol}
                status={card.status}
                playing={playing}
                onPress={handlePlay}
              />
            );
          })}
      </ThemedView>
      <ThemedView style={[styles.row, { justifyContent: 'space-between' }]}>
        <ThemedText type='error'>
          {`${Array.from(Array(player.lives)).fill('❤️').join('')}${Array.from(
            Array(5 - player.lives),
          )
            .fill('🤍')
            .join('')}`}
        </ThemedText>
        <ThemedView
          style={{
            borderWidth: 1,
            borderColor: Colors.dark.tabIconSelected,
            flexDirection: 'row',
            gap: 10,
            borderRadius: 4,
            padding: 5,
            minWidth: 40,
          }}
        >
          <ThemedText type='error'>{player.dealer && '🟡'}</ThemedText>
          <ThemedText type='error'>{player.current && '🎲'}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};
