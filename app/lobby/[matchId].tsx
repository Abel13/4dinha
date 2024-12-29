import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useUserSessionStore } from '@/hooks/useUserSessionStore';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedFlatList } from '@/components/ThemedFlatList';
import { useLocalSearchParams } from 'expo-router';
import { useMatchUsers } from '@/hooks/useMatchUsers';
import { PlayerItem } from '@/components/PlayerItem';
import { useMatch } from '@/hooks/useMatch';

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 50,
    padding: 20,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    gap: 20,
  },
});

export default function LobbyScreen() {
  const { matchId } = useLocalSearchParams();
  const { session } = useUserSessionStore((state) => state);
  const { match, startMatch } = useMatch(matchId as string);
  const { players, loadingLobby, updateStatus } = useMatchUsers(
    matchId as string,
  );

  const me = players.find((p) => p.user_id === session?.user.id);

  if (!me)
    return (
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='subtitle'>{match?.name}</ThemedText>
      </ThemedView>
    );

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText type='subtitle'>{match?.name}</ThemedText>
      <ThemedView />
      <PlayerItem matchUser={me} />
      <ThemedView />
      <ThemedFlatList
        data={players.filter((p) => p.user_id !== session?.user.id)}
        renderItem={({ item }) => {
          return <PlayerItem matchUser={item} />;
        }}
        refreshing={loadingLobby}
      />
      <ThemedView style={styles.row}>
        <ThemedButton
          title={me.ready ? 'CANCELAR' : 'PRONTO'}
          onPress={() => {
            updateStatus(match!.id, !me.ready);
          }}
        />
        {match?.user_id === session?.user.id && (
          <ThemedButton
            title='INICIAR PARTIDA'
            disabled={!!players.find((p) => !p.ready)}
            onPress={() => {
              startMatch();
            }}
          />
        )}
      </ThemedView>
    </ThemedView>
  );
}
