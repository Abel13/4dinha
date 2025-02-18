import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

import { type HandStatus, type Suit, type Symbol } from '@/types/Card';
import { Colors } from '@/constants/Colors';

interface CardProps {
  id?: string;
  status: HandStatus;
  suit?: Suit;
  symbol?: Symbol;
  playing?: boolean;
  size?: 'small' | 'big';
  onPress?: (id?: string) => void;
}

export function Card({
  id,
  suit,
  symbol,
  playing,
  status,
  size = 'small',
  onPress,
}: CardProps) {
  const visible = symbol && suit;

  if (playing || status !== 'on hand')
    return (
      <ThemedView
        style={[styles.card, styles[size], !visible && styles.cardBack]}
      >
        {visible ? (
          <ThemedView style={styles.cardContent}>
            <ThemedText
              type='paragraph'
              style={[styles[`symbol_${size}`], styles[suit]]}
            >
              {symbol}
            </ThemedText>
            <ThemedText type='paragraph' style={[styles[`suit_${size}`]]}>
              {suit}
            </ThemedText>
          </ThemedView>
        ) : (
          <Image
            source={require('../assets/images/logo.png')}
            style={styles[`logo_${size}`]}
          />
        )}
      </ThemedView>
    );

  return (
    <TouchableOpacity
      style={[styles.card, styles[size], !visible && styles.cardBack]}
      onPress={() => {
        if (onPress) onPress(id || '');
      }}
    >
      {visible ? (
        <ThemedView style={styles.cardContent}>
          <ThemedText
            type='paragraph'
            style={[styles[`symbol_${size}`], styles[suit]]}
          >
            {symbol}
          </ThemedText>
          <ThemedText type='paragraph' style={[styles[`suit_${size}`]]}>
            {suit}
          </ThemedText>
        </ThemedView>
      ) : (
        <Image
          source={require('../assets/images/logo.png')}
          style={styles[`logo_${size}`]}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  small: {
    width: 38,
    height: 50,
  },
  big: {
    width: 50,
    height: 68,
  },
  card: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    backgroundColor: Colors.dark.white,
    shadowColor: Colors.dark.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    padding: 2,
    paddingTop: -5,
    paddingLeft: 3,
  },
  cardBack: {
    backgroundColor: Colors.dark.cardBack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-around',
  },
  symbol_small: {
    flex: 0.8,
    textAlign: 'left',
    fontSize: 14,
    fontFamily: 'BarlowCondensedBold',
  },
  symbol_big: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'BarlowCondensedBold',
  },
  suit_small: {
    textAlign: 'right',
    fontSize: 17,
  },
  suit_big: { textAlign: 'right', fontSize: 22 },
  logo_small: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  logo_big: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  '♥️': {
    color: Colors.dark.cardRed,
  },
  '♦️': {
    color: Colors.dark.cardRed,
  },
  '♠️': {
    color: Colors.dark.black,
  },
  '♣️': {
    color: Colors.dark.black,
  },
});
