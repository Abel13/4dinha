import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Match } from '@/types/Match';
import { Pressable, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomColor: Colors.dark.tint,
    borderBottomWidth: 1,
  },
});

interface Props {
  match: Match;
  onPress: () => void;
}

export const MatchItem = ({ match, onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <ThemedText>{match.name}</ThemedText>
    </Pressable>
  );
};
