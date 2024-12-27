import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedButton } from '@/components/ThemedButton';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ThemedFlatList } from '@/components/ThemedFlatList';
import { useMatch } from '@/hooks/useMatch';

export default function LobbyScreen() {
  const router = useRouter();
  const { matches } = useMatch();

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
      <ThemedButton title='Nova Partida' onPress={handleNewMatch} />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>Partidas</ThemedText>
        {matches &&
          matches.map((item) => {
            return <ThemedText>{item.name}</ThemedText>;
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
  },
});
