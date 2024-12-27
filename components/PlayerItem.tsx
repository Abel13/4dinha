import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { MatchUser } from '@/types/MatchUser';
import { Image, StyleSheet } from 'react-native';
import { usePlayer } from '@/hooks/usePlayer';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    gap: 10,
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: '50%',
  },
});

interface Props {
  matchUser: MatchUser;
}

export const PlayerItem = ({ matchUser }: Props) => {
  const { playerName } = usePlayer(matchUser.user_id);

  if (playerName === null)
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Carregando...</ThemedText>
      </ThemedView>
    );

  console.log('P', playerName);
  return (
    <ThemedView style={styles.container}>
      <Image
        source={{
          uri: `https://api.dicebear.com/7.x/bottts-neutral/png?seed=${playerName}&scale=90`,
        }}
        style={styles.profileImage}
      />
      <ThemedText>{playerName}</ThemedText>
    </ThemedView>
  );
};
