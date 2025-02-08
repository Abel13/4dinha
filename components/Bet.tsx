import { useEffect, useRef, useState } from 'react';
import useBet from '@/hooks/useBet';
import { ThemedButton } from './ThemedButton';
import { ThemedText } from './ThemedText';
import { View, Animated, Easing, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { ThemedView } from './ThemedView';

export const Bet = ({
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
}) => {
  const { bet, max, add, subtract } = useBet(
    betCount,
    cardQuantity,
    checkLimit,
  );
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [hide, setHide] = useState(false);

  const toggleHide = () => {
    setHide(!hide);
    Animated.timing(slideAnim, {
      toValue: !hide ? 1 : 0,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        width: '100%',
        alignItems: 'center',
      }}
    >
      {/* Área de apostas e botão animados juntos */}
      <Animated.View
        style={{
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -150], // Move tudo para cima ao esconder
              }),
            },
          ],
          opacity: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.9], // Reduz um pouco a opacidade quando recolhido
          }),
          alignItems: 'center',
        }}
      >
        {/* Área de apostas */}
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.9)',
            borderBottomStartRadius: 10,
            width: '50%',
            alignItems: 'center',
            paddingTop: 10,
            paddingHorizontal: 10,
            height: 150,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ThemedButton title="-" onPress={subtract} disabled={bet === 0} />
            <ThemedText>{bet}</ThemedText>
            <ThemedButton title="+" onPress={add} disabled={bet === max} />
          </View>
          <ThemedButton
            title="APOSTAR"
            onPress={() => handleBet(bet)}
            loading={betting}
          />
        </View>

        {/* Botão de esconder/mostrar (agora animado junto com o painel) */}
        <ThemedView
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.9)',
            borderBottomStartRadius: 10,
            borderBottomEndRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            gap: 20,
          }}
        >
          <TouchableOpacity
            onPress={refreshGame}
            activeOpacity={0.8}
            style={{}}
          >
            <Feather name={'refresh-cw'} color={Colors.dark.tint} size={22} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleHide} activeOpacity={0.8} style={{}}>
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
};
