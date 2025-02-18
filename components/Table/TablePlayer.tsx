import { StyleSheet, Image, ViewStyle } from 'react-native';

import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

import { Colors } from '@/constants/Colors';

interface TablePlayer {
  number: number;
  playerPicture?: string | null;
  lives: number;
  name: string | null;
  bet: string;
  dealer: boolean;
}

interface TablePlayerProps {
  player: TablePlayer;
}

interface PlayerInfoProps {
  player: TablePlayer;
  isVertical: boolean;
}

export function TablePlayer({ player }: TablePlayerProps) {
  const isVerticalPlayer = player.number === 2 || player.number === 6;

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.playerInfoContainer}>
        <PlayerInfo player={player} isVertical={isVerticalPlayer} />
      </ThemedView>
    </ThemedView>
  );
}

function PlayerInfo({ player, isVertical }: PlayerInfoProps) {
  return (
    <ThemedView style={getFlexStyle(isVertical)}>
      <ThemedView>
        {player.playerPicture && (
          <Image source={{ uri: player.playerPicture }} style={styles.image} />
        )}

        <ThemedView style={styles.livesIndicator}>
          <ThemedText style={styles.heartEmoji} type='paragraph'>
            ❤️
          </ThemedText>
          <ThemedText style={styles.livesCount} type='paragraph'>
            {player.lives}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={getPlayerDetailsStyle(isVertical)}>
        {player.name && (
          <ThemedText
            style={[
              styles.name,
              { width: isVertical ? '100%' : 75, maxWidth: 95 },
            ]}
            numberOfLines={1}
          >
            {player.name}
          </ThemedText>
        )}
        <ThemedView style={getScoreAndDealerStyle(isVertical)}>
          <ThemedView style={styles.betContainer}>
            <ThemedText style={styles.bet}>{player.bet}</ThemedText>
          </ThemedView>
          {player.dealer && (
            <ThemedView style={styles.dealerEmojiContainer}>
              <ThemedText style={styles.dealerEmoji} type='paragraph'>
                ⚪
              </ThemedText>
              <ThemedText style={styles.dealerText} type='paragraph'>
                D
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const getFlexStyle = (isVertical: boolean): ViewStyle => ({
  flexDirection: isVertical ? 'column' : 'row',
  alignItems: isVertical ? 'center' : 'flex-start',
});

const getPlayerDetailsStyle = (isVertical: boolean): ViewStyle => ({
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: isVertical ? 0 : 5,
  bottom: isVertical ? 18 : 0,
});

const getScoreAndDealerStyle = (isVertical: boolean): ViewStyle => ({
  ...(isVertical
    ? {
        alignSelf: 'center',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
      }
    : {
        flexDirection: 'row',
        alignItems: 'center',
        width: 80,
        justifyContent: 'space-between',
      }),
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 100,
    padding: 2,
  },
  playerInfoContainer: {
    position: 'relative',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  livesIndicator: {
    left: -5,
    bottom: 15,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartEmoji: {
    fontSize: 16,
    position: 'absolute',
    lineHeight: 25,
  },
  livesCount: {
    fontSize: 12,
    fontFamily: 'BarlowCondensedBold',
    color: Colors.dark.white,
    zIndex: 1,
    lineHeight: 20,
  },
  name: {
    color: Colors.dark.white,
    width: 75,
  },
  betContainer: {
    backgroundColor: Colors.dark.blackTransparent07,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  bet: {
    color: Colors.dark.white,
    fontSize: 12,
  },
  dealerEmojiContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dealerEmoji: {
    position: 'absolute',
    textAlign: 'center',
  },
  dealerText: {
    position: 'absolute',
    fontFamily: 'BarlowCondensedBold',
    color: Colors.dark.black,
    textAlign: 'center',
    textAlignVertical: 'center',
    top: 0.5,
    left: 0.5,
    right: 0,
    bottom: 0,
  },
});
