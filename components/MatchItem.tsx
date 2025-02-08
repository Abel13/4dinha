import { Image, Pressable, StyleSheet } from 'react-native';
import { useCallback } from 'react';
import { type Match } from '@/types/Match';
import { Colors } from '@/constants/Colors';
import { useMatch } from '@/hooks/useMatch';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

const styles = StyleSheet.create({
  container: {
    maxWidth: 400,
    padding: 10,
    borderColor: Colors.dark.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    marginVertical: 5,
    backgroundColor: 'transparent',
  },
  matchPicture: {
    width: 30,
    height: 30,
    borderRadius: 4,
    marginRight: 10,
  },
  title: {
    gap: 5,
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: 'transparent',
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
      <ThemedText type="default" darkColor={Colors.dark.success}>
        {getStatus(match?.status)}
      </ThemedText>
    </Pressable>
  );
};
