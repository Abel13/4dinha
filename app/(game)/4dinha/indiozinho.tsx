import { Bet } from '@/components/Bet';
import { Card } from '@/components/Card';
import { ResultItem } from '@/components/ResultItem';
import { TableSeat } from '@/components/TableSeat';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useGame } from '@/hooks/useGame';
import { Feather } from '@expo/vector-icons';
import { useKeepAwake } from 'expo-keep-awake';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { Button, Image, Modal, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
    justifyContent: 'space-between',
  },
  table: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
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
  modalContainer: {
    flex: 1,
    paddingBottom: '40%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 60, 120, 0.4)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});

export default function Indiozinho() {
  useKeepAwake();
  const { gameId } = useLocalSearchParams();
  const [isModalVisible, setModalVisible] = useState(false);

  const {
    me,
    indiozinho1,
    indiozinho2,
    turn,
    roundStatus,
    isFetching,
    isLoading,
    dealing,
    handlePlay,
    handleDeal,
    betCount,
    betting,
    cardQuantity,
    checkLimit,
    handleBet,
    handleFinishRound,
    refreshGame,
    roundNumber,
    trump,
    trumps,
    results,
    getEmoji,
    playing,
  } = useGame(gameId as string);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const onTrumpPress = useCallback(() => {
    if (trump.symbol) setModalVisible(true);
  }, [trump]);

  return (
    <ThemedView style={styles.container}>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType='slide'
        onRequestClose={closeModal}
      >
        <ThemedView style={styles.modalContainer}>
          <ThemedView style={styles.modalContent}>
            <ThemedView
              style={[
                {
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
              ]}
            >
              <ThemedText type='title'>Trunfos</ThemedText>
              <Feather
                name='x-circle'
                onPress={closeModal}
                color={Colors.dark.link}
                size={24}
              />
            </ThemedView>
            <ThemedView
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-evenly',
              }}
            >
              {trumps.map((card) => {
                return (
                  <Card
                    key={`${card.symbol}${card.suit}`}
                    status='played'
                    suit={card.suit}
                    symbol={card.symbol}
                  />
                );
              })}
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal>

      <Modal
        visible={roundStatus === 'finished'}
        transparent={true}
        animationType='slide'
      >
        <ThemedView style={styles.modalContainer}>
          <ThemedView style={styles.modalContent}>
            <ThemedView
              style={[
                {
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                },
              ]}
            >
              <ThemedText type='title'>{`Fim da rodada ${roundNumber}`}</ThemedText>
            </ThemedView>
            <ThemedView style={{ width: '100%', gap: 5 }}>
              {results &&
                results.map((result) => {
                  return <ResultItem result={result} key={result.user_id} />;
                })}
            </ThemedView>
            <ThemedView style={{}}>
              {me?.dealer ? (
                <Button
                  title='Concluir Rodada'
                  color={Colors.dark.success}
                  onPress={handleFinishRound}
                />
              ) : (
                <ThemedText>Aguarde o início da próxima rodada...</ThemedText>
              )}
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal>

      <Modal
        visible={
          !!(
            roundStatus === 'betting' &&
            me?.current &&
            !isFetching &&
            !isLoading
          )
        }
        transparent={true}
        animationType='slide'
      >
        <ThemedView style={styles.modalContainer}>
          <ThemedView style={styles.modalContent}>
            <Bet
              betCount={betCount}
              betting={betting}
              cardQuantity={cardQuantity!}
              checkLimit={checkLimit}
              handleBet={handleBet}
              refreshGame={refreshGame}
              loading={isFetching || isLoading}
            />
          </ThemedView>
        </ThemedView>
      </Modal>

      <TableSeat number={2} player={indiozinho2} currentTurn={turn} />
      <ThemedView style={styles.table}>
        <ThemedView
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: Colors.dark.border,
            borderRadius: 10,
            padding: 10,
            marginVertical: 5,
            gap: 2,
            height: '100%',
          }}
        >
          <ThemedText type='subtitle'>
            {roundNumber > 0 ? `RODADA ${roundNumber}` : 'INICIANDO RODADA'}
          </ThemedText>
          <ThemedView />
          <ThemedText>{`${cardQuantity || '-'} carta${
            cardQuantity === 1 ? '' : 's'
          }`}</ThemedText>
          <ThemedText>{`APOSTAS: ${betCount}`}</ThemedText>
        </ThemedView>
        <ThemedView
          style={{
            borderWidth: 1,
            borderColor: Colors.dark.tabIconDefault,
            alignItems: 'center',
            padding: 10,
            borderRadius: 4,
            gap: 10,
          }}
        >
          <ThemedText>MANILHA</ThemedText>
          <ThemedView>
            <Card
              suit={trump?.suit}
              symbol={trump?.symbol}
              status={'on hand'}
              onPress={onTrumpPress}
            />
          </ThemedView>
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
                checkLimit && me?.current && roundStatus === 'betting'
                  ? Colors.dark.danger
                  : Colors.dark.border,
              borderRadius: 10,
              minHeight: '60%',
              padding: 10,
              marginBottom: 5,
            }}
          >
            {checkLimit &&
              me?.current &&
              cardQuantity &&
              roundStatus === 'betting' && (
                <ThemedText type='error'>{`Sua aposta precisa ser diferente de: ${Math.abs(
                  betCount - cardQuantity,
                )}`}</ThemedText>
              )}
          </ThemedView>
        </ThemedView>
      </ThemedView>
      {me?.dealer && !roundStatus ? (
        <ThemedView
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
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
            flex: 1,
          }}
        >
          <TableSeat
            number={1}
            player={indiozinho1}
            handlePlay={(id) => {
              if (me) handlePlay(id!);
            }}
            playing={playing}
            currentTurn={turn}
          />
        </ThemedView>
      )}
    </ThemedView>
  );
}
