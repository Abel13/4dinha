import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Match } from '@/types/Match';
import { Image, Pressable, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useMatch } from '@/hooks/useMatch';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomColor: Colors.dark.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  matchPicture: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});

interface Props {
  match: Match;
  onPress: () => void;
}

export const MatchItem = ({ match, onPress }: Props) => {
  const { matchPicture } = useMatch(match.id);

  if (!matchPicture)
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Carregando...</ThemedText>
      </ThemedView>
    );

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={{
          uri: matchPicture,
        }}
        style={styles.matchPicture}
      />
      <ThemedText>{match.name}</ThemedText>
    </Pressable>
  );
};
