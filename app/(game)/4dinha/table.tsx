import { Card } from '@/components/Card';
import { TableSeat } from '@/components/TableSeat';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useGame } from '@/hooks/useGame';
import { useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
    paddingBottom: 40,
  },
  track: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  trump: {
    backgroundColor: Colors.dark.background,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: 120,
    height: 100,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.dark.tint,
  },
  popup: {
    flex: 1,
    backgroundColor: Colors.dark.info,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.dark.tint,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default function Table() {
  const { gameId } = useLocalSearchParams();

  const {
    dealing,
    me,
    player2,
    player3,
    player4,
    player5,
    player6,
    trump,
    isFetching,
    isLoading,
    roundStatus,
    bet,
    betCount,
    max,
    cardQuantity,
    roundNumber,
    checkLimit,
    betting,
    playing,
    add,
    subtract,
    handleDeal,
    handlePlay,
    handleBet,
    refreshGame,
  } = useGame(gameId as string);

  const handleTrumps = useCallback(async () => {}, []);

  const getEmoji = (
    status?:
      | 'dealing'
      | 'betting'
      | 'playing'
      | 'finished'
      | 'loading'
      | 'indiozinho',
  ) => {
    switch (status) {
      case 'betting':
        return '💵';
      case 'playing':
        return '🎮';
      case 'loading':
        return '⏳';
      case 'finished':
        return '🏁';
      case 'indiozinho':
        return '🏹';
      default:
        return '🎰';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.track}>
        <ThemedView style={styles.row}>
          <ThemedView
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: Colors.dark.border,
              borderRadius: 10,
              padding: 10,
              marginVertical: 5,
              gap: 2,
            }}
          >
            <ThemedText type='subtitle'>{`RODADA ${roundNumber}`}</ThemedText>
            <ThemedView />
            <ThemedText>{`${cardQuantity || '-'} carta${cardQuantity === 1 ? '' : 's'}`}</ThemedText>
            <ThemedText>{`APOSTAS: ${betCount}`}</ThemedText>
          </ThemedView>
          <ThemedView>
            <TableSeat number={4} player={player4} />
          </ThemedView>
          <ThemedView
            style={{
              flex: 1,
              gap: 5,
            }}
          >
            <ThemedView style={styles.popup}>
              <ThemedText type='title'>
                {isFetching || isLoading
                  ? getEmoji('loading')
                  : getEmoji(roundStatus)}
              </ThemedText>
            </ThemedView>
            <ThemedView
              style={{
                borderWidth: 1,
                borderColor:
                  checkLimit && me?.current
                    ? Colors.dark.danger
                    : Colors.dark.border,
                borderRadius: 10,
                minHeight: '60%',
                padding: 10,
                marginBottom: 5,
              }}
            >
              {checkLimit && me?.current && (
                <ThemedText type='error'>{`Sua aposta precisa ser diferente de: ${Math.abs(betCount - cardQuantity)}`}</ThemedText>
              )}
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.track}>
        <ThemedView style={styles.row}>
          <TableSeat number={3} player={player3} />
          <TableSeat number={5} player={player5} />
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.trump}>
        <ThemedText>MANILHA</ThemedText>
        <Card
          suit={trump?.suit}
          symbol={trump?.symbol}
          status={'played'}
          onPress={handleTrumps}
        />
      </ThemedView>
      <ThemedView style={styles.track}>
        <ThemedView style={styles.row}>
          <TableSeat number={2} player={player2} />
          <TableSeat number={6} player={player6} />
        </ThemedView>
      </ThemedView>

      <ThemedView
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          gap: 10,
          marginTop: 20,
          paddingTop: 5,
          borderColor: Colors.dark.border,
          borderTopWidth: 1,
        }}
      >
        {me?.dealer && !roundStatus && !isFetching && !isLoading ? (
          <ThemedView
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 0.6,
            }}
          >
            <ThemedButton
              title='dar cartas'
              loading={dealing}
              onPress={handleDeal}
            />
          </ThemedView>
        ) : (
          <ThemedView
            style={{
              flex: 0.6,
            }}
          >
            <TableSeat
              number={1}
              player={me}
              handlePlay={handlePlay}
              playing={playing}
            />
          </ThemedView>
        )}
        {roundStatus === 'betting' &&
          me?.current &&
          !isFetching &&
          !isLoading && (
            <ThemedView
              style={{
                flex: 0.3,
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <ThemedView
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <ThemedButton
                  title='-'
                  onPress={subtract}
                  disabled={bet === 0}
                />
                <ThemedText>{bet}</ThemedText>
                <ThemedButton title='+' onPress={add} disabled={bet === max} />
              </ThemedView>
              <ThemedButton
                title='APOSTAR'
                onPress={handleBet}
                loading={betting}
              />
            </ThemedView>
          )}
        <ThemedView
          style={{ justifyContent: 'center', alignItems: 'center', flex: 0.1 }}
        >
          <ThemedButton
            title='↻'
            loading={isFetching || isLoading}
            onPress={refreshGame}
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
