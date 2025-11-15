import { Image, StyleSheet } from 'react-native';
import { useCallback } from 'react';
import { type Match } from '@/types/Match';
import { Colors } from '@/constants/Colors';
import { getDiceBear } from '@/utils/getDiceBear';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { SoundButton } from './SoundButton';

const styles = StyleSheet.create({
  container: {
    width: 150,
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    flex: 1,
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

interface Props {
  match: Match;
  enterMatch: () => void;
  continueMatch: () => void;
}

export function MatchItem({ match, enterMatch, continueMatch }: Props) {
  const matchPicture = getDiceBear()({ avatar: 'icons', seed: match.id });

  const getStatus = useCallback(
    (status: string | null): keyof typeof Feather.glyphMap => {
      switch (status) {
        case 'created':
          return 'chevron-right';
        case 'started':
          return 'flag';
        default:
          return 'clock';
      }
    },
    [],
  );

  const handlePress = () => {
    if (match.status === 'created') enterMatch();

    if (match.status === 'started') continueMatch();
  };

  if (!match || !matchPicture)
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
        <ThemedText
          darkColor={Colors.light.text}
          lineBreakMode='tail'
          numberOfLines={1}
          style={{ flex: 1 }}
        >
          {match.name}
        </ThemedText>
      </ThemedView>
      <Feather
        name={getStatus(match.status)}
        color={Colors.light.text}
        size={16}
      />
    </SoundButton>
  );
}
