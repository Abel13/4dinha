import { Colors } from '@/constants/Colors';
import { ThemedView } from './ThemedView';
import { Image, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { usePlayer } from '@/hooks/usePlayer';
import { type GamePlayer } from '@/types';
import { Card } from './Card';

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
  empty: {
    borderColor: Colors.dark.tabIconDefault,
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
    gap: 1,
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
  userContainer: {
    flex: 0.5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: -17,
    zIndex: 3,
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  profileImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  roundInfoContainer: {
    borderWidth: 1,
    borderColor: Colors.dark.tabIconSelected,
    flexDirection: 'row',
    gap: 10,
    borderRadius: 4,
    padding: 5,
    minWidth: 40,
  },
  dealerEmojiContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dealerText: {
    position: 'absolute',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

export const TableSeat = ({
  player,
  number,
  playing,
  currentTurn,
  handlePlay,
}: {
  player?: GamePlayer;
  number: number;
  playing?: boolean;
  currentTurn: number;
  handlePlay?: (id?: string) => void;
}) => {
  const { playerName, playerPicture } = usePlayer(player?.user_id!);

  if (!player?.user_id)
    return (
      <ThemedView style={[styles.seat, styles.empty]}>
        <ThemedView style={styles.row}>
          <ThemedText style={styles.number}>{number}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.row} />
        <ThemedView style={styles.row} />
      </ThemedView>
    );

  return (
    <ThemedView style={[styles.seat, player.current && styles.current]}>
      <ThemedView style={styles.userContainer}>
        <ThemedView style={styles.row}>
          {playerPicture && (
            <Image
              source={{
                uri: playerPicture,
              }}
              style={styles.profileImage}
            />
          )}
          <ThemedText type="default" numberOfLines={1} style={{ maxWidth: 85 }}>
            {playerName}
          </ThemedText>
        </ThemedView>
        <ThemedText type="h4">
          {`🎲 ${Number.isNaN(Number(player.wins)) ? '-' : player.wins}/${Number.isNaN(Number(player.bet)) ? '-' : player.bet}`}
        </ThemedText>
      </ThemedView>
      <ThemedView
        style={[
          styles.row,
          { flex: 1, justifyContent: 'space-between', marginTop: 10 },
        ]}
      >
        <ThemedView style={[styles.row, { flex: 1 }]}>
          {player.cards &&
            player.cards
              .filter((c) => c.status === 'on hand')
              .map((card) => {
                return (
                  <ThemedView
                    key={card.id}
                    style={!card.symbol && { marginRight: -25 }}
                  >
                    <Card
                      id={card.id}
                      suit={card.suit}
                      symbol={card.symbol}
                      status={card.status}
                      playing={playing}
                      onPress={handlePlay}
                    />
                  </ThemedView>
                );
              })}
        </ThemedView>
        <ThemedView
          style={{
            flex: 1,
            maxWidth: 45,
            height: '100%',
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          darkColor={Colors.dark.table}
        >
          {player.cards &&
            player.cards
              .filter((c) => c.status === 'on table' && c.turn === currentTurn)
              .map((card) => {
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
      </ThemedView>
      <ThemedView style={[styles.row, { justifyContent: 'space-between' }]}>
        <ThemedText type="error">
          {`${Array.from(Array(player.lives)).fill('❤️').join('')}${Array.from(
            Array(5 - player.lives),
          )
            .fill('🤍')
            .join('')}`}
        </ThemedText>

        <ThemedView style={styles.roundInfoContainer}>
          <ThemedView style={styles.dealerEmojiContainer}>
            <ThemedText type="error">{player.dealer && '🟡'}</ThemedText>
            <ThemedText type="error" style={styles.dealerText}>
              {player.dealer && 'D'}
            </ThemedText>
          </ThemedView>
          <ThemedText type="error">{player.current && '🎲'}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};
