import { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  Easing,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import useBet from '@/hooks/useBet';
import { Colors } from '@/constants/Colors';
import { useSound } from '@/hooks/useAudioConfig';
import { useSettingsStore } from '@/hooks/useSettingsStore';
import { useHaptics } from '@/hooks/useHaptics';
import { ThemedButton } from './ThemedButton';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { SoundButton } from './SoundButton';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'center',
  },
  animatedContainer: {
    alignItems: 'center',
  },
  betContainer: {
    backgroundColor: Colors.dark.blackTransparent09,
    borderBottomStartRadius: 10,
    width: '50%',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
    height: 150,
    shadowColor: Colors.dark.background,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  betControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBar: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.blackTransparent09,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 20,
    shadowColor: Colors.dark.background,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
});

export function Bet({
  betCount,
  cardQuantity,
  checkLimit,
  betting,
  loading,
  handleBet,
  refreshGame,
}: {
  betCount: number;
  cardQuantity: number;
  checkLimit: boolean;
  loading: boolean;
  betting: boolean;
  handleBet: (bet: number) => void;
  refreshGame: () => void;
}) {
  const { bet, max, add, subtract } = useBet(
    betCount,
    cardQuantity,
    checkLimit,
  );
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [hide, setHide] = useState(false);
  const { getVolume } = useSettingsStore((store) => store);
  const { playSoundAsync } = useSound();
  const { selection } = useHaptics();

  const toggleHide = useCallback(() => {
    setHide(!hide);
    playSoundAsync({ type: 'collapse', volume: getVolume('ui') });
    selection();
    Animated.timing(slideAnim, {
      toValue: !hide ? 1 : 0,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [getVolume, hide, playSoundAsync, selection, slideAnim]);

  useEffect(() => {
    if (cardQuantity === 1) toggleHide();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -150],
                }),
              },
            ],
            opacity: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.9],
            }),
          },
        ]}
      >
        <View style={styles.betContainer}>
          <View style={styles.betControls}>
            <ThemedButton title='-' onPress={subtract} disabled={bet === 0} />
            <ThemedText lightColor={Colors.dark.text}>{bet}</ThemedText>
            <ThemedButton title='+' onPress={add} disabled={bet === max} />
          </View>
          <ThemedText type='error'>
            {checkLimit &&
              `Sua aposta precisa ser diferente de: ${Math.abs(
                betCount - cardQuantity,
              )}`}
          </ThemedText>
          <ThemedButton
            title='APOSTAR'
            onPress={() => handleBet(bet)}
            loading={betting}
            disabled={loading}
          />
        </View>

        <ThemedView style={styles.controlBar}>
          {hide && (
            <ThemedText type='link'>desça o painel para apostar</ThemedText>
          )}
          <TouchableOpacity onPress={refreshGame}>
            {loading ? (
              <ActivityIndicator color={Colors.dark.tint} />
            ) : (
              <Feather name='refresh-cw' color={Colors.dark.tint} size={22} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleHide}>
            <Feather
              name={hide ? 'chevron-down' : 'chevron-up'}
              color={Colors.dark.tint}
              size={28}
            />
          </TouchableOpacity>
        </ThemedView>
      </Animated.View>
    </View>
  );
}
