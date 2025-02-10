import { useCallback, useEffect, useState } from 'react';

export default function useBet(
  currentCount: number,
  cardQuantity: number,
  checkLimit: boolean = false,
) {
  const [bet, setBet] = useState(0);

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
      setBet(newBet);
    }
  }, [bet, checkLimit, currentCount, cardQuantity, max]);

  const subtract = useCallback(() => {
    let newBet = bet - 1;
    if (newBet + currentCount === cardQuantity && checkLimit) {
      newBet -= 1;
    }
    if (newBet >= 0) {
      setBet(newBet);
    }
  }, [bet, checkLimit, currentCount, cardQuantity]);

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
