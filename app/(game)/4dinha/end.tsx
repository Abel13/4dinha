import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Image, StyleSheet } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useGame } from '@/hooks/useGame';
import { Colors } from '@/constants/Colors';
import { usePlayer } from '@/hooks/usePlayer';
import { ThemedButton } from '@/components/ThemedButton';
import { useUserSessionStore } from '@/hooks/useUserSessionStore';
import { useMatch } from '@/hooks/useMatch';

export default function End() {
  const { gameId } = useLocalSearchParams();
  const { session } = useUserSessionStore();

  const { winner } = useGame(gameId as string);

  const { match, endMatch } = useMatch(gameId as string);

  const { playerName, playerPicture } = usePlayer(winner?.user_id || '');

  if (!winner)
    return (
      <ThemedView style={styles.container}>
        <ThemedView>
          <ThemedText type='title' style={styles.title}>
            🫠 Ops! 🫠
          </ThemedText>
          <ThemedText style={styles.message}>Ninguém ganhou essa!</ThemedText>
        </ThemedView>

        {session?.user?.id === match?.user_id ? (
          <ThemedButton title='Finalizar partida' onPress={endMatch} />
        ) : (
          <ThemedText>Aguarde a finalização da partida...</ThemedText>
        )}
      </ThemedView>
    );

  if (!playerName || !playerPicture || !match)
    return <ActivityIndicator size={100} color={Colors.dark.info} />;

  return (
    <ThemedView style={styles.container}>
      <ThemedView>
        <ThemedText type='title' style={styles.title}>
          🎉 Parabéns, {playerName}! 🎉
        </ThemedText>
        <ThemedText style={styles.message}>O mestre do 4dinha!!</ThemedText>
      </ThemedView>
      <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} fadeOut />

      <ThemedView style={styles.card}>
        {playerPicture && (
          <Image
            source={{
              uri: playerPicture,
            }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        )}
        <ThemedText type='subtitle' style={styles.winnerName}>
          🏆 {playerName} 🏆
        </ThemedText>
        <ThemedText type='defaultSemiBold' style={styles.stats}>
          Venceu {(match?.round_number || 0) - 1} Rodadas!
        </ThemedText>
      </ThemedView>

      {session?.user?.id === match?.user_id ? (
        <ThemedButton title='Finalizar partida' onPress={endMatch} />
      ) : (
        <ThemedText>Aguarde a finalização da partida...</ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 60,
    paddingVertical: 20,
    backgroundColor: Colors.dark.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.dark.text,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.dark.text,
  },
  card: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.dark.info,
    shadowColor: Colors.dark.info,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    gap: 10,
    alignItems: 'center',
  },
  winnerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 10,
  },
  stats: {
    color: Colors.dark.icon,
  },
});
