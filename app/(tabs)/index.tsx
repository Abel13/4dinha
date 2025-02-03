import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedButton } from '@/components/ThemedButton';
import { useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { MatchItem } from '@/components/MatchItem';
import { useMatchList } from '@/hooks/useMatchList';

export default function LobbyScreen() {
  const router = useRouter();
  const { matches, enterMatch, inProgressMatches } = useMatchList();

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
        <ThemedText type='subtitle'>Partidas em andamento</ThemedText>
        {inProgressMatches &&
          inProgressMatches.map((item) => {
            return (
              <ThemedView key={item.matches.id}>
                <MatchItem
                  match={item.matches}
                  enterMatch={() => enterMatch(item.matches.id)}
                  continueMatch={() => {
                    router.push({
                      pathname: '/(game)/4dinha',
                      params: {
                        gameId: item.matches.id,
                      },
                    });
                  }}
                />
                <ThemedView style={{ height: 4 }} />
              </ThemedView>
            );
          })}
        <ThemedView style={styles.separator} />
        <ThemedText type='subtitle'>Novas partidas</ThemedText>
        {matches &&
          matches
            .filter((i) => {
              return !inProgressMatches.find((p) => p.match_id === i.id);
            })
            .map((item) => {
              return (
                <ThemedView key={item.id}>
                  <MatchItem
                    match={item}
                    enterMatch={() => enterMatch(item.id)}
                    continueMatch={() => {
                      router.replace({
                        pathname: '/(game)/4dinha',
                        params: {
                          gameId: item.id,
                        },
                      });
                    }}
                  />
                  <ThemedView style={{ height: 4 }} />
                </ThemedView>
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
  separator: {
    height: 15,
  },
});
