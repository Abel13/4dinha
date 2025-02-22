import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useUserSessionStore } from '@/hooks/useUserSessionStore';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedFlatList } from '@/components/ThemedFlatList';
import { router, useLocalSearchParams } from 'expo-router';
import { useMatchUsers } from '@/hooks/useMatchUsers';
import { PlayerItem } from '@/components/PlayerItem';
import { useMatch } from '@/hooks/useMatch';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 50,
    gap: 10,
  },
  matchPicture: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  padding: {
    padding: 10,
  },
  paddingHorizontal: {
    paddingHorizontal: 10,
  },
  center: {
    justifyContent: 'center',
  },
});

export default function LobbyScreen() {
  const { matchId } = useLocalSearchParams();
  const { session } = useUserSessionStore((state) => state);
  const { match, matchPicture, startMatch } = useMatch(matchId as string);
  const { players, loadingLobby, updateStatus } = useMatchUsers(
    matchId as string,
  );

  const me = players.find((p) => p.user_id === session?.user.id);

  if (!me)
    return (
      <ThemedView style={[styles.titleContainer, styles.padding]}>
        <ThemedText type='subtitle'>{match?.name}</ThemedText>
      </ThemedView>
    );

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedView style={[styles.row, styles.padding]}>
        <TouchableOpacity onPress={router.back}>
          <Feather
            name='chevron-left'
            color={Colors.dark.tabIconDefault}
            size={24}
          />
        </TouchableOpacity>
        <Image
          source={{
            uri: matchPicture?.toString(),
          }}
          style={styles.matchPicture}
        />
        <ThemedText type='subtitle'>{match?.name}</ThemedText>
      </ThemedView>
      <ThemedView />
      <PlayerItem matchUser={me} />
      <ThemedView />
      <ThemedText style={styles.paddingHorizontal} type='subtitle'>
        Jogadores
      </ThemedText>
      <ThemedFlatList
        data={players.filter((p) => p.user_id !== session?.user.id)}
        renderItem={({ item }) => {
          return <PlayerItem matchUser={item} />;
        }}
        refreshing={loadingLobby}
      />
      <ThemedView style={[styles.row, styles.center]}>
        <ThemedButton
          title={me.ready ? 'CANCELAR' : 'PRONTO'}
          type={me.ready ? 'danger' : 'default'}
          onPress={() => {
            updateStatus(match!.id, !me.ready);
          }}
        />
        {match?.user_id === session?.user.id && (
          <ThemedButton
            title='INICIAR PARTIDA'
            disabled={!!players.find((p) => !p.ready) || players.length < 3}
            onPress={() => {
              startMatch();
            }}
          />
        )}
      </ThemedView>
    </ThemedView>
  );
}
