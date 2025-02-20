import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/Colors';
import { PlayerCardOnGame } from '@/types';
import { useGamePositions } from '@/hooks/useTableSeat';
import type { TableSeatProps } from './TableSeat';

import { ThemedView } from '../ThemedView';
import { Card } from '../Card';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },
  tableCardsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  tableCard: {
    position: 'absolute',
    zIndex: 1,
    width: 38,
    height: 50,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dotted',
    borderWidth: 2,
    borderColor: Colors.dark.border,
    alignContent: 'center',
    padding: 2,
    backgroundColor: Colors.dark.transparent,
  },
  cardsOnHand: {
    position: 'absolute',
    width: 40,
    height: 60,
    zIndex: -5,
  },
  cardsOnHandContainer: {
    flex: 1,
    maxWidth: 50,
  },
});
interface TableCardsProps {
  cards: PlayerCardOnGame;
  number: number;
  playing?: boolean;
  currentTurn: number;
  handlePlay?: (id?: string) => void;
}

function CardsOnTable({
  cards,
  number,
  playing,
  currentTurn,
  handlePlay,
}: TableCardsProps) {
  const { getTableCardPosition } = useGamePositions();
  return (
    <ThemedView
      style={[styles.tableCard, getTableCardPosition(number)]}
      darkColor={Colors.dark.table}
    >
      {cards
        .filter((c) => c.status === 'on table' && c.turn === currentTurn)
        .map((card) => (
          <Card
            key={card.id}
            id={card.id}
            suit={card.suit}
            symbol={card.symbol}
            status={card.status}
            playing={playing}
            onPress={handlePlay}
          />
        ))}
    </ThemedView>
  );
}

function CardsOnHand({
  cards,
  number,
  playing,
  handlePlay,
}: Omit<TableCardsProps, 'currentTurn'>) {
  const { calculateCardAngle, calculateCardLeft, getOnHandCardPosition } =
    useGamePositions();

  return (
    <ThemedView style={[styles.row, styles.cardsOnHandContainer]}>
      {cards
        .filter((c) => c.status === 'on hand')
        .map((card, index) => {
          const angle = calculateCardAngle(cards.length, index, number);
          const cardPosition = getOnHandCardPosition(number, angle);

          return (
            <ThemedView
              key={card.id}
              style={[
                cardPosition,
                styles.cardsOnHand,
                {
                  left: calculateCardLeft(number, index),
                  zIndex: index,
                },
              ]}
            >
              <Card
                id={card.id}
                suit={card.suit}
                symbol={card.symbol}
                status={card.status}
                playing={playing}
                onPress={handlePlay}
                size={number === 1 ? 'big' : 'small'}
              />
            </ThemedView>
          );
        })}
    </ThemedView>
  );
}

export function TableCards({
  player,
  number,
  playing,
  currentTurn,
  handlePlay,
}: TableSeatProps) {
  if (!player) return null;

  return (
    <ThemedView style={styles.tableCardsContainer}>
      {number !== 6 && (
        <CardsOnHand
          cards={player.cards}
          number={number}
          playing={playing}
          handlePlay={handlePlay}
        />
      )}

      <CardsOnTable
        cards={player.cards}
        number={number}
        currentTurn={currentTurn}
        playing={playing}
        handlePlay={handlePlay}
      />

      {number === 6 && (
        <CardsOnHand
          cards={player.cards}
          number={number}
          playing={playing}
          handlePlay={handlePlay}
        />
      )}
    </ThemedView>
  );
}
