import { useCallback, useEffect, useState } from 'react';

export default function useBet(
  currentCount: number,
  currentRound?: number,
  checkLimit: boolean = false,
) {
  const [bet, setBet] = useState(0);

  function calculateMaxBet(round_number?: number): number {
    // if (!round_number) return NaN;

    const maxCards = 6;
    const roundAbs = (round_number - 1) % (maxCards * 2);
    return roundAbs < maxCards
      ? roundAbs + 1
      : maxCards - (roundAbs % maxCards);
  }
  const max = calculateMaxBet(currentRound);

  const add = useCallback(() => {
    let newBet = bet + 1;
    if (newBet + currentCount === currentRound && checkLimit) {
      newBet += 1;
    }
    if (newBet <= max) {
      setBet(newBet);
    }
  }, [bet, checkLimit, currentCount, currentRound, max]);

  const subtract = useCallback(() => {
    let newBet = bet - 1;
    if (newBet + currentCount === currentRound && checkLimit) {
      newBet -= 1;
    }
    if (newBet >= 0) {
      setBet(newBet);
    }
  }, [bet, checkLimit, currentCount, currentRound]);

  useEffect(() => {
    if (checkLimit) {
      if (currentCount === currentRound) {
        setBet(1);
      }
    }
  }, [checkLimit, currentCount, currentRound]);

  useEffect(() => {}, [bet]);

  return { bet, max, add, subtract };
}
