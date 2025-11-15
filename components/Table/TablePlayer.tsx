import { StyleSheet, ViewStyle } from 'react-native';
import React, { memo } from 'react';

import { Colors } from '@/constants/Colors';

import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { SvgImage } from '../SvgImage';
import Lives from '../Lives';

interface ITablePlayer {
  number: number;
  playerPicture?: string | null;
  lives: number;
  name: string | null;
  bet: string;
  dealer: boolean;
  current: boolean;
}

interface TablePlayerProps {
  player: ITablePlayer;
}

interface PlayerInfoProps {
  player: ITablePlayer;
  isVertical: boolean;
}

const arePlayersEqual = (a: ITablePlayer, b: ITablePlayer) =>
  a.number === b.number &&
  a.playerPicture === b.playerPicture &&
  a.lives === b.lives &&
  a.name === b.name &&
  a.bet === b.bet &&
  a.dealer === b.dealer &&
  a.current === b.current;

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
  current: {
    borderWidth: 2,
    borderColor: Colors.dark.success,
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

const getFlexStyle = (isVertical: boolean): ViewStyle => ({
  flexDirection: isVertical ? 'column' : 'row',
  alignItems: isVertical ? 'center' : 'flex-start',
});

const getPlayerDetailsStyle = (isVertical: boolean): ViewStyle => ({
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: isVertical ? 0 : 5,
});

const getScoreAndDealerStyle = (isVertical: boolean): ViewStyle => ({
  ...(isVertical
    ? {
        alignSelf: 'center',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5,
      }
    : {
        flexDirection: 'row',
        alignItems: 'center',
        width: 80,
        justifyContent: 'space-between',
      }),
});

const PlayerInfo = memo(
  function PlayerInfo({ player, isVertical }: PlayerInfoProps) {
    return (
      <ThemedView style={getFlexStyle(isVertical)}>
        <Lives
          totalSegments={5}
          filledSegments={player.lives}
          glowIntensity={0.5}
          size={45}
          strokeWidth={7}
        >
          <ThemedView>
            {player.playerPicture && (
              <SvgImage
                xml={player.playerPicture}
                containerStyle={[
                  styles.image,
                  player.current ? styles.current : {},
                ]}
              />
            )}
          </ThemedView>
        </Lives>

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
            <ThemedView style={styles.betContainer}>
              <ThemedText style={styles.bet}>{player.bet}</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    );
  },
  (prev, next) =>
    prev.isVertical === next.isVertical &&
    arePlayersEqual(prev.player, next.player),
);

export const TablePlayer = memo(
  function TablePlayer({ player }: TablePlayerProps) {
    const isVerticalPlayer = player.number === 2 || player.number === 6;

    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.playerInfoContainer}>
          <PlayerInfo player={player} isVertical={isVerticalPlayer} />
        </ThemedView>
      </ThemedView>
    );
  },
  (prev, next) => arePlayersEqual(prev.player, next.player),
);
