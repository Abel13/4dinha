import type React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

export const Card: React.FC<CardProps> = ({
  id,
  suit,
  symbol,
  playing,
  status,
  size = 'small',
  onPress,
}) => {
  const visible = symbol && suit;

  if (playing || status !== 'on hand')
    return (
      <View style={[styles.card, styles[size], !visible && styles.cardBack]}>
        {visible ? (
          <View style={styles.cardContent}>
            <Text style={[styles[`symbol_${size}`], styles[suit]]}>
              {symbol}
            </Text>
            <Text style={[styles[`suit_${size}`]]}>{suit}</Text>
          </View>
        ) : (
          <Image
            source={require('../assets/images/logo.png')}
            style={styles[`logo_${size}`]}
          />
        )}
      </View>
    );

  return (
    <TouchableOpacity
      style={[
        styles.card,
        styles[size],
        !visible && styles.cardBack,
        visible && styles.notPlayed,
      ]}
      onPress={() => {
        if (onPress) onPress(id || '');
      }}
    >
      {visible ? (
        <View style={styles.cardContent}>
          <Text style={[styles[`symbol_${size}`], styles[suit]]}>{symbol}</Text>
          <Text style={[styles[`suit_${size}`]]}>{suit}</Text>
        </View>
      ) : (
        <Image
          source={require('../assets/images/logo.png')}
          style={styles[`logo_${size}`]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  small: {
    width: 35,
    height: 45,
  },
  big: {
    width: 62,
    height: 80,
  },
  card: {
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
    backgroundColor: '#994050',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  symbol_small: {
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'bold',
  },
  symbol_big: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
  },
  suit_small: { textAlign: 'right', fontSize: 18 },
  suit_big: { textAlign: 'right', fontSize: 40 },
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
  notPlayed: {
    borderColor: Colors.dark.success,
    borderWidth: 2,
    shadowColor: Colors.dark.success,
  },
  '♥️': {
    color: '#FF4C4C',
  },
  '♦️': {
    color: '#FF4C4C',
  },
  '♠️': {
    color: '#000',
  },
  '♣️': {
    color: '#000',
  },
});
