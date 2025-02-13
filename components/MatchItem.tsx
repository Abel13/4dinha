import { Image, StyleSheet } from 'react-native';
import { useCallback } from 'react';
import { type Match } from '@/types/Match';
import { Colors } from '@/constants/Colors';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { SoundButton } from './SoundButton';
import { useDiceBear } from '@/hooks/useDiceBear';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
    borderRadius: 4,
    backgroundColor: '#9290c3',
    padding: 5,
  },
  matchPicture: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
  title: {
    gap: 5,
    flexDirection: 'row',
  },
});

interface Props {
  match: Match;
  enterMatch: () => void;
  continueMatch: () => void;
}

export function MatchItem({ match, enterMatch, continueMatch }: Props) {
  const matchPicture = useDiceBear()({ avatar: 'icons', seed: match.id });

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

  if (!match)
    return (
      <ThemedView style={styles.container}>
        <ThemedText darkColor={Colors.light.text}>Carregando...</ThemedText>
      </ThemedView>
    );

  return (
    <SoundButton sound='menu' onPress={handlePress} style={styles.container}>
      <ThemedView style={styles.title}>
        <Image
          source={{
            uri: matchPicture,
          }}
          style={styles.matchPicture}
        />
        <ThemedText darkColor={Colors.light.text}>{match.name}</ThemedText>
      </ThemedView>
      <ThemedText type='default' darkColor={Colors.light.success}>
        {getStatus(match?.status)}
      </ThemedText>
    </SoundButton>
  );
}
