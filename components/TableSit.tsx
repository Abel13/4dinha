import { Colors } from '@/constants/Colors';
import { ThemedView } from './ThemedView';
import { Image, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { usePlayer } from '@/hooks/usePlayer';
import { GamePlayer } from '@/types';
import { Card } from './Card';

const styles = StyleSheet.create({
  sit: {
    flex: 1,
    minWidth: '45%',
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.dark.tint,
    borderRadius: 10,
    padding: 5,
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

export const TableSit = ({
  player,
  number,
}: {
  player?: GamePlayer;
  number: number;
}) => {
  const { playerName, playerPicture } = usePlayer(player?.user_id as string);

  if (!player?.user_id)
    return (
      <ThemedView style={styles.sit}>
        <ThemedView style={styles.row}>
          <ThemedText style={styles.number}>{number}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.row} />
        <ThemedView style={styles.row}></ThemedView>
      </ThemedView>
    );

  return (
    <ThemedView style={styles.sit}>
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
      <ThemedView style={styles.row}>
        {player.cards &&
          player.cards.map((card) => {
            return (
              <Card
                suit={card.suit}
                symbol={card.symbol}
                visible={!!card.symbol}
                key={card.id}
              />
            );
          })}
      </ThemedView>
      <ThemedView style={styles.row}>
        <ThemedText type='error'>{`${Array.from(Array(player.lives))
          .fill('❤️')
          .join('')}${Array.from(Array(5 - player.lives))
          .fill('🤍')
          .join('')}`}</ThemedText>
        <ThemedText type='error'>{player.dealer && '🟡'}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};
