import { StyleSheet } from 'react-native';
import { type MatchUser } from '@/types/MatchUser';
import { usePlayer } from '@/hooks/usePlayer';
import { Colors } from '@/constants/Colors';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { SvgImage } from './SvgImage';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'space-between',
    borderBottomColor: Colors.dark.purple,
    borderBottomWidth: 1,
  },
  row: {
    gap: 10,
    flexDirection: 'row',
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
});

interface Props {
  matchUser: MatchUser;
}

export function PlayerItem({ matchUser }: Props) {
  const { playerName, playerPicture } = usePlayer(matchUser.user_id);

  if (playerName === null || playerPicture === null)
    return (
      <ThemedView style={styles.container}>
        <ThemedText lightColor={Colors.dark.text}>Carregando...</ThemedText>
      </ThemedView>
    );

  return (
    <ThemedView style={[styles.container, styles.row]}>
      <ThemedView style={styles.row}>
        <SvgImage xml={playerPicture as string} style={styles.profileImage} />
        <ThemedText type='default' lightColor={Colors.dark.text}>
          {playerName}
        </ThemedText>
      </ThemedView>
      <ThemedText
        darkColor={Colors.dark.success}
        lightColor={Colors.dark.success}
      >
        {matchUser.ready ? 'PRONTO' : ''}
      </ThemedText>
    </ThemedView>
  );
}
