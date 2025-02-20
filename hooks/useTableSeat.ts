import { useMemo } from 'react';
import { ViewStyle } from 'react-native';

import { scale, verticalScale } from '@/utils/scalingUtils';

export const useGamePositions = () => {
  const formatBet = (wins: number, bet: number): string =>
    `🎲 ${Number.isNaN(Number(wins)) ? '-' : wins}/${
      Number.isNaN(Number(bet)) ? '-' : bet
    }`;

  const calculateCardAngle = useMemo(
    () =>
      (cardCount: number, index: number, number: number): number => {
        const angleStep = 9;
        const baseAngle = (-angleStep * (cardCount - 1)) / 2;
        return number !== 1 ? baseAngle + index * angleStep : 0;
      },
    [],
  );

  const calculateCardLeft = useMemo(
    () =>
      (number: number, index: number): number => {
        const baseOffset = number === 1 ? verticalScale(120) : verticalScale(4);

        return index * baseOffset;
      },
    [],
  );

  const getTableCardPosition = useMemo(
    () =>
      (seat: number): { [key: string]: string | number } => {
        const positions = {
          1: { bottom: scale(50), left: verticalScale(315) },
          2: { top: scale(0), left: verticalScale(360) },
          3: { top: scale(38), left: verticalScale(360) },
          4: { top: scale(38), left: verticalScale(150) },
          5: { top: scale(38), right: verticalScale(350) },
          6: { top: scale(0), right: verticalScale(370) },
        };

        return positions[seat as keyof typeof positions] || {};
      },
    [],
  );

  const getOnHandCardPosition = useMemo(
    () =>
      (seat: number, angle: number): { transform: ViewStyle['transform'] } => {
        const positions = {
          1: {
            translateY: scale(-15),
            translateX: verticalScale(-14),
          },
          2: {
            translateY: scale(-8),
            translateX: verticalScale(-150),
          },
          3: {
            translateY: scale(5),
            translateX: verticalScale(0),
          },
          4: {
            translateY: scale(5),
            translateX: verticalScale(0),
          },
          5: {
            translateY: scale(5),
            translateX: verticalScale(0),
          },
          6: {
            translateY: scale(-8),
            translateX: verticalScale(170),
          },
        };

        const position = positions[seat as keyof typeof positions] || {
          translateX: 0,
          translateY: 0,
        };

        return {
          transform: [
            { translateX: position.translateX },
            { translateY: position.translateY },
            { rotate: `${angle}deg` },
          ],
        };
      },
    [],
  );

  const getPlayerPosition = useMemo(
    () =>
      (seat: number): { [key: string]: string | number } => {
        const positions: { [key: number]: { [key: string]: string | number } } =
          {
            1: { bottom: scale(15), right: verticalScale(25) },
            2: { top: scale(-3), left: verticalScale(-50) },
            3: { top: scale(-5), left: verticalScale(150) },
            4: { top: scale(-5), left: verticalScale(150) },
            5: { top: scale(-5), left: verticalScale(150) },
            6: { top: scale(-3), right: verticalScale(-100) },
          };

        return positions[seat] || {};
      },
    [],
  );

  return {
    formatBet,
    calculateCardAngle,
    calculateCardLeft,
    getTableCardPosition,
    getOnHandCardPosition,
    getPlayerPosition,
  };
};
