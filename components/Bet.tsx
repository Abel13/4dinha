import useBet from '@/hooks/useBet';
import { ThemedButton } from './ThemedButton';
import { ThemedText } from './ThemedText';
import { View } from 'react-native';

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

  return (
    <View
      style={{
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          width: '50%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 20,
          }}
        >
          <ThemedButton title="-" onPress={subtract} disabled={bet === 0} />
          <ThemedText>{bet}</ThemedText>
          <ThemedButton title="+" onPress={add} disabled={bet === max} />
        </View>
        <ThemedButton
          title="APOSTAR"
          onPress={() => {
            handleBet(bet);
          }}
          loading={betting}
        />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ThemedButton title="↻" loading={loading} onPress={refreshGame} />
      </View>
    </View>
  );
};
