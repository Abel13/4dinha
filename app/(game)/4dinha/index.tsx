import { useCallback, useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Modal,
  StyleSheet,
} from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';

import { Bet } from '@/components/Bet';
import { Card } from '@/components/Card';
import { ResultItem } from '@/components/ResultItem';
import { TableSeat } from '@/components/Table/TableSeat';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StatusPanel } from '@/components/StatusPanel';

import { Colors } from '@/constants/Colors';
import { useGame } from '@/hooks/useGame';
import type { Suit, Symbol } from '@/types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

interface Trump {
  symbol: Symbol;
  suit: Suit;
}

interface Result {
  user_id: string;
  bets: number;
  wins: number;
  lives: number;
}

interface TrumpsModalProps {
  isVisible: boolean;
  onClose: () => void;
  trumps: Trump[];
}

interface RoundFinishedModalProps {
  isVisible: boolean;
  roundNumber: number;
  results: Result[];
  isDealer: boolean | undefined;
  onFinishRound: () => void;
  finishing: boolean;
}

interface BettingModalProps {
  isVisible: boolean;
  betCount: number;
  betting: boolean;
  cardQuantity: number | undefined;
  checkLimit: boolean;
  handleBet: (bet: number) => void;
  refreshGame: () => void;
  loading: boolean;
  trumps: Trump[];
}

interface GameInfoProps {
  roundNumber: number;
  cardQuantity: number | undefined;
  betCount: number;
  isDealer: boolean | undefined;
}

export default function Table() {
  useKeepAwake();
  const { gameId } = useLocalSearchParams();
  const [isTrumpsModalVisible, setTrumpsModalVisible] = useState(false);

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
    betCount,
    turn,
    cardQuantity,
    roundNumber,
    checkLimit,
    playing,
    trumps,
    results,
    currentPage,
    betting,
    finishing,
    currentPlayer,
    handleDeal,
    handlePlay,
    handleBet,
    handleFinishRound,
    refreshGame,
  } = useGame(gameId as string);

  const closeTrumpsModal = useCallback(() => setTrumpsModalVisible(false), []);
  const openTrumpsModal = useCallback(() => setTrumpsModalVisible(true), []);

  useEffect(() => {
    if (currentPage) {
      router.replace({
        pathname: `/(game)/4dinha/${currentPage}`,
        params: { gameId },
      });
    }
  }, [currentPage]);

  return (
    <ThemedView style={styles.container}>
      <TrumpsModal
        isVisible={isTrumpsModalVisible}
        onClose={closeTrumpsModal}
        trumps={trumps}
      />

      <RoundFinishedModal
        isVisible={roundStatus === 'finished'}
        roundNumber={roundNumber}
        results={results}
        isDealer={me?.dealer}
        onFinishRound={handleFinishRound}
        finishing={finishing}
      />

      <BettingModal
        isVisible={
          !!(
            roundStatus === 'betting' &&
            me?.current &&
            !isFetching &&
            !isLoading
          )
        }
        betCount={betCount}
        betting={betting}
        cardQuantity={cardQuantity}
        checkLimit={checkLimit}
        handleBet={handleBet}
        refreshGame={refreshGame}
        loading={isFetching || isLoading}
        trumps={trumps}
      />
      <ImageBackground
        source={require('@/assets/images/background.jpg')}
        resizeMode='stretch'
        style={styles.background}
      >
        {/* TOPO */}
        <GameInfo
          roundNumber={roundNumber}
          cardQuantity={cardQuantity}
          betCount={betCount}
          isDealer={me?.dealer}
        />

        <ThemedView style={[styles.container, styles.topRowContainer]}>
          <ThemedView style={[styles.track, styles.row]}>
            <TableSeat number={3} player={player3} currentTurn={turn} />
            <TableSeat number={4} player={player4} currentTurn={turn} />
            <TableSeat number={5} player={player5} currentTurn={turn} />
          </ThemedView>
        </ThemedView>

        {/* MEIO */}
        <ThemedView style={styles.container}>
          <ThemedView style={styles.track}>
            <ThemedView style={styles.row}>
              <TableSeat number={2} player={player2} currentTurn={turn} />
              <ThemedView>
                <ThemedView style={styles.trump}>
                  <Card
                    suit={trump?.suit}
                    symbol={trump?.symbol}
                    status='on hand'
                    onPress={openTrumpsModal}
                  />
                </ThemedView>
              </ThemedView>
              <TableSeat number={6} player={player6} currentTurn={turn} />
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* ME */}
        <ThemedView style={styles.bottomSection}>
          {me?.dealer && !roundStatus && !isFetching && !isLoading ? (
            <ThemedView style={styles.dealButton}>
              <ThemedButton
                title='dar cartas'
                loading={dealing}
                color='white'
                onPress={handleDeal}
              />
            </ThemedView>
          ) : (
            <ThemedView style={styles.playerSeat}>
              <TableSeat
                number={1}
                player={me}
                handlePlay={async (id) => {
                  await handlePlay(id!);
                }}
                playing={playing}
                currentTurn={turn}
              />
            </ThemedView>
          )}

          <ThemedView style={styles.statusContainer}>
            <StatusPanel
              currentPlayer={currentPlayer}
              loading={isLoading || isFetching}
              me={me!}
              roundStatus={roundStatus}
            />

            <ThemedView style={styles.refreshButton}>
              <ThemedButton
                title='↻'
                loading={isFetching || isLoading}
                color='white'
                onPress={refreshGame}
              />
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ImageBackground>
    </ThemedView>
  );
}

function TrumpsModal({ isVisible, onClose, trumps }: TrumpsModalProps) {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType='fade'
      onRequestClose={onClose}
      supportedOrientations={['landscape']}
    >
      <ThemedView style={[styles.modalContainer, styles.centeredContent]}>
        <ThemedView style={styles.trumpsModalContent}>
          <ThemedView style={styles.trumpsModalHeader}>
            <ThemedText type='title' lightColor={Colors.dark.text}>
              Trunfos
            </ThemedText>
            <Feather
              name='x-circle'
              onPress={onClose}
              color={Colors.dark.link}
              size={24}
            />
          </ThemedView>
          <ThemedView style={styles.trumpsCardContainer}>
            {trumps.map((card) => (
              <Card
                key={`${card.symbol}${card.suit}`}
                status='played'
                suit={card.suit}
                symbol={card.symbol}
              />
            ))}
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

function RoundFinishedModal({
  isVisible,
  roundNumber,
  results,
  isDealer,
  onFinishRound,
  finishing,
}: RoundFinishedModalProps) {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType='slide'
      supportedOrientations={['landscape']}
    >
      <ThemedView
        style={[styles.modalContainer, styles.roundFinishedModalContent]}
      >
        <ThemedView style={styles.roundFinishedModalInner}>
          <FlatList
            keyExtractor={(i) => i.user_id}
            data={results}
            stickyHeaderIndices={[0]}
            renderItem={({ item }) => (
              <ResultItem result={item} key={item.user_id} />
            )}
            ItemSeparatorComponent={() => <ThemedView style={{ height: 10 }} />}
            ListFooterComponent={() => <ThemedView style={{ height: 100 }} />}
            ListHeaderComponent={() => (
              <ThemedView
                darkColor={Colors.dark.background}
                lightColor={Colors.dark.background}
              >
                <ThemedView style={styles.roundFinishedHeaderTitle}>
                  <ThemedText
                    type='title'
                    lightColor={Colors.dark.text}
                  >{`Fim da rodada ${roundNumber}`}</ThemedText>
                </ThemedView>
                <ThemedView style={styles.roundFinishedHeaderAction}>
                  {isDealer ? (
                    <ThemedButton
                      title='Concluir Rodada'
                      color={Colors.dark.success}
                      onPress={onFinishRound}
                      disabled={finishing}
                    />
                  ) : (
                    <ThemedText lightColor={Colors.dark.text}>
                      Aguarde o início da próxima rodada...
                    </ThemedText>
                  )}
                </ThemedView>
              </ThemedView>
            )}
          />
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

function BettingModal({
  isVisible,
  betCount,
  betting,
  cardQuantity,
  checkLimit,
  handleBet,
  refreshGame,
  loading,
  trumps,
}: BettingModalProps) {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType='fade'
      supportedOrientations={['landscape']}
    >
      <ThemedView style={styles.modalContainer}>
        <ThemedView style={styles.modalContent}>
          {cardQuantity && (
            <Bet
              betCount={betCount}
              betting={betting}
              cardQuantity={cardQuantity}
              checkLimit={checkLimit}
              handleBet={handleBet}
              refreshGame={refreshGame}
              loading={loading}
            />
          )}
        </ThemedView>
        <ThemedView style={styles.trumpsOverlay}>
          <ThemedText type='subtitle' lightColor={Colors.dark.text}>
            TRUNFOS
          </ThemedText>
          <ThemedView style={styles.trumpsCardRow}>
            {trumps.map((card) => (
              <Card
                key={`${card.symbol}${card.suit}`}
                status='played'
                suit={card.suit}
                symbol={card.symbol}
              />
            ))}
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

function GameInfo({
  roundNumber,
  cardQuantity,
  betCount,
  isDealer,
}: GameInfoProps) {
  return (
    <ThemedView style={styles.gameInfoContainer}>
      <ThemedText type='h4' lightColor={Colors.dark.text}>
        {roundNumber > 0
          ? `RODADA ${roundNumber}`
          : isDealer
          ? 'DISTRIBUA AS CARTAS'
          : 'INICIANDO A RODADA.\nAGUARDE!'}
      </ThemedText>
      <ThemedView />
      {roundNumber > 0 && (
        <ThemedView>
          <ThemedText lightColor={Colors.dark.text}>{`${
            cardQuantity || '-'
          } carta${cardQuantity === 1 ? '' : 's'}`}</ThemedText>
          <ThemedText
            lightColor={Colors.dark.text}
          >{`APOSTAS: ${betCount}`}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  background: {
    flex: 1,
    paddingTop: 25,
    gap: 30,
    paddingBottom: 5,
  },
  track: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 60,
    gap: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  trump: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.dark.blackTransparent03,
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  centeredContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  trumpsModalContent: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingBottom: 20,
    backgroundColor: Colors.dark.trumpsModalBackground,
    borderColor: Colors.dark.tint,
    borderWidth: 1,
    borderRadius: 10,
    gap: 20,
  },
  trumpsModalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trumpsCardContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  roundFinishedModalContent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
  },
  roundFinishedModalInner: {
    width: '50%',
  },
  roundFinishedHeaderTitle: {
    margin: 10,
  },
  roundFinishedHeaderAction: {
    margin: 20,
  },
  trumpsOverlay: {
    top: '40%',
    backgroundColor: Colors.dark.black,
    padding: 10,
    borderRadius: 10,
    gap: 15,
    zIndex: 1000,
    shadowColor: Colors.dark.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 8,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  trumpsCardRow: {
    flexDirection: 'row',
    gap: 5,
  },
  gameInfoContainer: {
    borderWidth: 1,
    borderColor: Colors.dark.border,
    backgroundColor: Colors.dark.background,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    gap: 1,
    width: 120,
    position: 'absolute',
    top: 5,
    left: 10,
  },
  topRowContainer: {
    paddingHorizontal: 70,
  },
  bottomSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 10,
    width: '70%',
    paddingRight: 10,
  },
  dealButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    height: '100%',
    backgroundColor: Colors.dark.tint,
    borderRadius: 10,
  },
  playerSeat: {
    maxWidth: '35%',
  },
  statusContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: 110,
  },
  refreshButton: {
    height: 110,
    borderRadius: 10,
    borderColor: Colors.dark.tint,
    backgroundColor: Colors.dark.tint,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 60,
    alignContent: 'center',
  },
});
