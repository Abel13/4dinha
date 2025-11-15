import { useCallback, useEffect, useState } from 'react';
import { ImpactFeedbackStyle } from 'expo-haptics';
import { useHaptics } from './useHaptics';

export default function useBet(
  currentCount: number,
  cardQuantity: number,
  checkLimit: boolean = false,
) {
  const [bet, setBet] = useState(0);
  const { impact } = useHaptics();

  function calculateMaxBet(roundNumber: number): number {
    const maxCards = 6;
    const roundAbs = (roundNumber - 1) % (maxCards * 2);
    return roundAbs < maxCards
      ? roundAbs + 1
      : maxCards - (roundAbs % maxCards);
  }
  const max = calculateMaxBet(cardQuantity);

  const add = useCallback(() => {
    let newBet = bet + 1;
    if (newBet + currentCount === cardQuantity && checkLimit) {
      newBet += 1;
    }
    if (newBet <= max) {
      impact(ImpactFeedbackStyle.Rigid);
      setBet(newBet);
    }
  }, [bet, currentCount, cardQuantity, checkLimit, max, impact]);

  const subtract = useCallback(() => {
    let newBet = bet - 1;
    if (newBet + currentCount === cardQuantity && checkLimit) {
      newBet -= 1;
    }
    if (newBet >= 0) {
      impact(ImpactFeedbackStyle.Rigid);
      setBet(newBet);
    }
  }, [bet, currentCount, cardQuantity, checkLimit, impact]);

  useEffect(() => {
    if (checkLimit) {
      if (currentCount === cardQuantity) {
        setBet(1);
      }
    }
  }, [checkLimit, currentCount, cardQuantity]);

  useEffect(() => {
    if (!checkLimit) {
      setBet(0);
    }
  }, [checkLimit]);

  return { bet, max, add, subtract };
}
