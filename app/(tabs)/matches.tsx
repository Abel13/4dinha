import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedButton } from '@/components/ThemedButton';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { useMatch } from '@/hooks/useMatch';
import { MatchItem } from '@/components/MatchItem';

export default function LobbyScreen() {
  const router = useRouter();
  const { matches, enterMatch } = useMatch();

  const handleNewMatch = useCallback(() => {
    router.push({
      pathname: '/lobby/new',
    });
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color='#808080'
          name='gamecontroller.fill'
          style={styles.headerImage}
        />
      }
    >
      <ThemedView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type='title'>Partidas</ThemedText>
          <ThemedButton title='Criar Partida' onPress={handleNewMatch} />
        </ThemedView>
        {matches &&
          matches.map((item) => {
            return (
              <MatchItem
                key={item.id}
                match={item}
                onPress={() => enterMatch(item.id)}
              />
            );
          })}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    gap: 10,
    paddingHorizontal: 20,
  },
});
