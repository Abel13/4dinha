import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedInput } from '@/components/ThemedInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUserSessionStore } from '@/hooks/useUserSessionStore';
import { format } from 'date-fns';
import { ThemedButton } from '@/components/ThemedButton';
import { useMatch } from '@/hooks/useMatch';
import { ThemedFlatList } from '@/components/ThemedFlatList';
import { useLocalSearchParams } from 'expo-router';
import { useMatchUsers } from '@/hooks/useMatchUsers';
import { PlayerItem } from '@/components/PlayerItem';

export default function LobbyScreen() {
  const { matchId } = useLocalSearchParams();
  const { players, loadingLobby } = useMatchUsers(matchId as string);

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText type='title'>Lobby</ThemedText>
      <ThemedFlatList
        data={players}
        renderItem={({ item }) => {
          return <PlayerItem matchUser={item} />;
        }}
        refreshing={loadingLobby}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    paddingTop: 100,
    padding: 20,
    gap: 10,
  },
});
