import { Card } from '@/components/Card';
import { TableSit } from '@/components/TableSit';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useGame } from '@/hooks/useGame';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingVertical: 60,
  },
  track: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  trump: {
    backgroundColor: Colors.dark.background,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: 120,
    height: 100,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.dark.tint,
  },
  popup: {
    backgroundColor: '#A1A8',
    position: 'absolute',
    top: 50,
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    zIndex: 1000,
  },
});

export default function Table() {
  const { gameId } = useLocalSearchParams();

  const {
    dealing,
    me,
    player2,
    player3,
    player4,
    player5,
    player6,
    isFetching,
    isLoading,
    roundStatus,
    handleDeal,
    refreshGame,
  } = useGame(gameId as string);

  return (
    <ThemedView style={styles.container}>
      {isFetching ||
        (isLoading && (
          <ThemedView style={styles.popup}>
            <ThemedText>carregando...</ThemedText>
          </ThemedView>
        ))}

      <ThemedView style={styles.track}>
        <TableSit number={4} player={player4} />
      </ThemedView>
      <ThemedView style={styles.track}>
        <ThemedView style={styles.row}>
          <TableSit number={3} player={player3} />
          <TableSit number={5} player={player5} />
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.trump}>
        <ThemedText>MANILHA</ThemedText>
        <Card suit='♠️' symbol='A' visible />
      </ThemedView>
      <ThemedView style={styles.track}>
        <ThemedView style={styles.row}>
          <TableSit number={2} player={player2} />
          <TableSit number={6} player={player6} />
        </ThemedView>
      </ThemedView>

      <ThemedView style={{ flex: 1, flexDirection: 'row' }}>
        {me?.dealer && roundStatus === 'dealing' ? (
          <ThemedButton
            title='dar cartas'
            loading={dealing}
            onPress={handleDeal}
          />
        ) : (
          <TableSit number={1} player={me} />
        )}
        <ThemedView
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
          <ThemedButton
            title='↻'
            loading={isFetching || isLoading}
            onPress={refreshGame}
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
