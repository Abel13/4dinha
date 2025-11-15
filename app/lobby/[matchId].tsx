import { StyleSheet } from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useUserSessionStore } from '@/hooks/useUserSessionStore';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedFlatList } from '@/components/ThemedFlatList';
import { useMatchUsers } from '@/hooks/useMatchUsers';
import { PlayerItem } from '@/components/PlayerItem';
import { useMatch } from '@/hooks/useMatch';
import { Colors } from '@/constants/Colors';
import { useKeepAwake } from 'expo-keep-awake';
import { SoundButton } from '@/components/SoundButton';
import { useEffect } from 'react';
import { useSound } from '@/hooks/useAudioConfig';
import * as Clipboard from 'expo-clipboard';

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 60,
    paddingBottom: 20,
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
    paddingVertical: 5,
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
  useKeepAwake();
  const { matchId } = useLocalSearchParams();
  const { session } = useUserSessionStore((state) => state);
  const { playSound } = useSound('changePlayer');
  const { match, startMatch } = useMatch(matchId as string);
  const { players, loadingLobby, updateStatus } = useMatchUsers(
    matchId as string,
  );

  const me = players.find((p) => p.user_id === session?.user.id);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(match?.name || '');
  };

  useEffect(() => {
    playSound({});
  }, [players.length]);

  if (!me)
    return (
      <ThemedView style={[styles.titleContainer, styles.padding]}>
        <ThemedText type='subtitle' lightColor={Colors.dark.text}>
          {match?.name}
        </ThemedText>
      </ThemedView>
    );

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedView style={[styles.row, { gap: 20 }]}>
        <SoundButton sound='menu' onPress={router.back}>
          <Feather
            name='chevron-left'
            color={Colors.dark.tabIconDefault}
            size={24}
          />
        </SoundButton>

        <ThemedText type='subtitle' lightColor={Colors.dark.text}>
          {match?.name}
        </ThemedText>
        <Feather
          name='copy'
          size={20}
          color={Colors.dark.icon}
          onPress={copyToClipboard}
        />
      </ThemedView>
      <PlayerItem matchUser={me} />
      <ThemedFlatList
        data={players.filter((p) => p.user_id !== session?.user.id)}
        emptyMessage='Aguardando jogadores...'
        renderItem={({ item }) => {
          return <PlayerItem matchUser={item} />;
        }}
        refreshing={loadingLobby}
      />
      <ThemedView style={[styles.row, styles.center, { height: 60 }]}>
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
