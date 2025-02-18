import { useMemo } from 'react';
import { Dimensions, ViewStyle } from 'react-native';

import { scale, verticalScale } from '@/utils/scalingUtils';

const { width, height } = Dimensions.get('window');
const BASE_SIZE = Math.min(width, height);

export const useGamePositions = () => {
  const formatBet = (wins: number, bet: number): string =>
    `🎲 ${Number.isNaN(Number(wins)) ? '-' : wins}/${
      Number.isNaN(Number(bet)) ? '-' : bet
    }`;

  const calculateCardAngle = useMemo(
    () =>
      (cardCount: number, index: number, number: number): number => {
        const angleStep = 15;
        const baseAngle = (-angleStep * (cardCount - 1)) / 2;
        return number !== 1 ? baseAngle + index * angleStep : 0;
      },
    [],
  );

  const calculateCardLeft = useMemo(
    () =>
      (number: number, index: number): number =>
        number === 1 ? index * verticalScale(120) : index * verticalScale(5),
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
    [BASE_SIZE],
  );

  const getOnHandCardPosition = useMemo(
    () =>
      (seat: number, angle: number): { transform: ViewStyle['transform'] } => {
        const positions = {
          1: {
            translateY: scale(-10),
            translateX: verticalScale(4),
          },
          2: {
            translateY: scale(-8),
            translateX: verticalScale(-180),
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
            translateX: verticalScale(200),
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
    [BASE_SIZE],
  );

  const getPlayerPosition = useMemo(
    () =>
      (seat: number): { [key: string]: string | number } => {
        const positions: { [key: number]: { [key: string]: string | number } } =
          {
            1: { bottom: scale(10), right: verticalScale(0) },
            2: { top: scale(-3), left: verticalScale(-80) },
            3: { top: scale(-5), left: verticalScale(150) },
            4: { top: scale(-5), left: verticalScale(150) },
            5: { top: scale(-5), left: verticalScale(150) },
            6: { top: scale(-3), right: verticalScale(-120) },
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
