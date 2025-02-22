import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Match } from '@/types/Match';
import { Image, Pressable, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useMatch } from '@/hooks/useMatch';
import { useCallback } from 'react';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderColor: Colors.dark.border,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
  },
  matchPicture: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
  title: {
    gap: 5,
  },
});

interface Props {
  match: Match;
  enterMatch: () => void;
  continueMatch: () => void;
}

export const MatchItem = ({ match, enterMatch, continueMatch }: Props) => {
  const { matchPicture } = useMatch(match.id);

  const getStatus = useCallback((status: string | null) => {
    switch (status) {
      case 'created':
        return 'LOBBY';
      case 'started':
        return 'INICIADA';
      default:
        return '';
    }
  }, []);

  const handlePress = () => {
    if (match.status === 'created') enterMatch();

    if (match.status === 'started') continueMatch();
  };

  if (!matchPicture)
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Carregando...</ThemedText>
      </ThemedView>
    );

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <ThemedView style={styles.title}>
        <Image
          source={{
            uri: matchPicture,
          }}
          style={styles.matchPicture}
        />
        <ThemedText>{match.name}</ThemedText>
      </ThemedView>
      <ThemedText type='default' darkColor={Colors.dark.success}>
        {getStatus(match?.status)}
      </ThemedText>
    </Pressable>
  );
};
