import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ThemedView } from './ThemedView';

interface CardProps {
  visible: boolean;
  suit: '♣️' | '♥️' | '♠️' | '♦️';
  symbol: string;
}

export const Card: React.FC<CardProps> = ({ visible, suit, symbol }) => {
  const getSuitColor = (): string => {
    if (suit === '♥️' || suit === '♦️') {
      return '#FF4C4C';
    }
    return '#000';
  };

  return (
    <ThemedView style={[styles.card, !visible && styles.cardBack]}>
      {visible ? (
        <View style={styles.cardContent}>
          <Text style={[styles.symbol, styles.left, { color: getSuitColor() }]}>
            {symbol}
          </Text>
          <Text style={[styles.suit, styles.center, { color: getSuitColor() }]}>
            {suit}
          </Text>
        </View>
      ) : (
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 35,
    height: 45,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    padding: 1,
  },
  cardBack: {
    backgroundColor: '#004080',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  left: {
    textAlign: 'left',
  },
  center: {
    fontSize: 20,
    textAlign: 'right',
  },
  symbol: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  suit: {
    fontSize: 10,
  },
  logo: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
});
