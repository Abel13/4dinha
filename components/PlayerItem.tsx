import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { MatchUser } from '@/types/MatchUser';
import { Image, StyleSheet } from 'react-native';
import { usePlayer } from '@/hooks/usePlayer';
import { Colors } from '@/constants/Colors';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'space-between',
  },
  row: {
    gap: 10,
    flexDirection: 'row',
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

  return (
    <ThemedView style={[styles.container, styles.row]}>
      <ThemedView style={styles.row}>
        <Image
          source={{
            uri: `https://api.dicebear.com/7.x/bottts-neutral/png?seed=${playerName}&scale=90`,
          }}
          style={styles.profileImage}
        />
        <ThemedText>{playerName}</ThemedText>
      </ThemedView>
      <ThemedText darkColor={Colors.dark.success}>
        {matchUser.ready ? 'PRONTO' : ''}
      </ThemedText>
    </ThemedView>
  );
};
