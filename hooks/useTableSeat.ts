import { useMemo } from 'react';
import { Dimensions, ViewStyle } from 'react-native';

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
        number === 1 ? index * 40 : index * 10,
    [],
  );

  const getTableCardPosition = useMemo(
    () =>
      (seat: number): { [key: string]: string | number } => {
        const positions = {
          1: { bottom: '110%', left: BASE_SIZE * 0.4 },
          2: { bottom: '30%', left: '55%' },
          3: { top: '93%', left: '90%' },
          4: { top: '93%', left: '40%' },
          5: { top: '93%', right: '90%' },
          6: { bottom: '30%', right: '55%' },
        };

        return positions[seat as keyof typeof positions] || {};
      },
    [BASE_SIZE],
  );

  const getOnHandCardPosition = useMemo(
    () =>
      (seat: number, angle: number): { transform: ViewStyle['transform'] } => {
        const positions = {
          1: { translateY: -BASE_SIZE * 0.001, translateX: BASE_SIZE * 0.3 },
          2: { translateY: -BASE_SIZE * 0.01, translateX: BASE_SIZE * 0.2 },
          3: { translateY: BASE_SIZE * 0.032, translateX: BASE_SIZE * 0.19 },
          4: { translateY: BASE_SIZE * 0.023, translateX: BASE_SIZE * 0.19 },
          5: { translateY: BASE_SIZE * 0.032, translateX: BASE_SIZE * 0.18 },
          6: { translateY: -BASE_SIZE * 0.01, translateX: BASE_SIZE * 0.625 },
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
      (seat: number): { [key: string]: string } => {
        const positions = {
          1: { bottom: '25%', right: '-80' },
          2: { bottom: '-6%', left: '-7%' },
          3: { top: '-10%', left: '35%' },
          4: { top: '-12%', left: '35%' },
          5: { top: '-10%', right: '1%' },
          6: { bottom: '-6%', right: '-14%' },
        };

        return positions[seat as keyof typeof positions] || {};
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
