import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, ImageBackground, Modal, StyleSheet } from 'react-native';
import { Bet } from '@/components/Bet';
import { Card } from '@/components/Card';
import { ResultItem } from '@/components/ResultItem';
import { TableSeat } from '@/components/TableSeat';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useGame } from '@/hooks/useGame';
import { StatusPanel } from '@/components/StatusPanel';
import { ThemedFlatList } from '@/components/ThemedFlatList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  background: {
    flex: 1,
    paddingTop: 25,
    gap: 30,
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
    width: '50%',
    backgroundColor: Colors.dark.table,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 5,
    gap: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 20, 20, 0.4)',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});

export default function Table() {
  const { gameId } = useLocalSearchParams();
  const [isModalVisible, setModalVisible] = useState(false);

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

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const onTrumpPress = useCallback(() => {
    setModalVisible(true);
  }, []);

  useEffect(() => {
    if (currentPage) {
      router.replace({
        pathname: `/(game)/4dinha/${currentPage}`,
        params: {
          gameId,
        },
      });
    }
  }, [currentPage]);

  return (
    <ThemedView style={styles.container}>
      <Modal
        visible={isModalVisible}
        transparent
        animationType='fade'
        onRequestClose={closeModal}
        supportedOrientations={['portrait', 'landscape']}
      >
        <ThemedView
          style={[
            styles.modalContainer,
            { alignItems: 'center', justifyContent: 'center' },
          ]}
        >
          <ThemedView
            style={[
              {
                width: '40%',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                paddingBottom: 20,
                backgroundColor: '#003B',
                borderColor: Colors.dark.tint,
                borderWidth: 1,
                borderRadius: 10,
                gap: 20,
              },
            ]}
          >
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
        transparent
        animationType='slide'
        supportedOrientations={['portrait', 'landscape']}
      >
        <ThemedView
          style={[
            styles.modalContainer,
            {
              alignItems: 'center',
              backgroundColor: Colors.dark.background,
            },
          ]}
        >
          <ThemedView
            style={{
              width: '50%',
            }}
          >
            <FlatList
              keyExtractor={(i) => i.user_id}
              data={results}
              stickyHeaderIndices={[0]}
              renderItem={({ item }) => {
                return <ResultItem result={item} key={item.user_id} />;
              }}
              ItemSeparatorComponent={() => (
                <ThemedView style={{ height: 10 }} />
              )}
              ListFooterComponent={() => <ThemedView style={{ height: 100 }} />}
              ListHeaderComponent={() => (
                <ThemedView darkColor={Colors.dark.background}>
                  <ThemedView
                    style={[
                      {
                        margin: 10,
                      },
                    ]}
                  >
                    <ThemedText type='title'>{`Fim da rodada ${roundNumber}`}</ThemedText>
                  </ThemedView>
                  <ThemedView style={{ margin: 20 }}>
                    {me?.dealer ? (
                      <ThemedButton
                        title='Concluir Rodada'
                        color={Colors.dark.success}
                        onPress={handleFinishRound}
                        disabled={finishing}
                      />
                    ) : (
                      <ThemedText>
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

      <Modal
        visible={
          !!(
            roundStatus === 'betting' &&
            me?.current &&
            !isFetching &&
            !isLoading
          )
        }
        transparent
        animationType='fade'
        supportedOrientations={['portrait', 'landscape']}
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
                loading={isFetching || isLoading}
              />
            )}
          </ThemedView>
          <ThemedView
            style={{
              top: '40%',
              position: 'absolute',
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
            }}
          >
            <ThemedText type='subtitle'>TRUNFOS</ThemedText>
            <ThemedView
              style={{
                flexDirection: 'row',
                gap: 5,
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
      <ImageBackground
        source={require('@/assets/images/background.jpg')}
        resizeMode='cover'
        style={styles.background}
      >
        {/* TOPO */}
        <ThemedView style={[styles.container, { paddingHorizontal: 70 }]}>
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
                  <ThemedText type='subtitle'>MANILHA</ThemedText>

                  <Card
                    suit={trump?.suit}
                    symbol={trump?.symbol}
                    status='on hand'
                    onPress={onTrumpPress}
                  />
                </ThemedView>
              </ThemedView>
              <TableSeat number={6} player={player6} currentTurn={turn} />
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* ME */}
        <ThemedView
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            gap: 10,
          }}
        >
          <ThemedView
            style={{
              borderWidth: 1,
              borderColor: Colors.dark.border,
              backgroundColor: Colors.dark.background,
              borderRadius: 10,
              padding: 10,
              marginVertical: 5,
              height: '100%',
              gap: 2,
            }}
          >
            <ThemedText type='h4'>
              {roundNumber > 0
                ? `RODADA ${roundNumber}`
                : me?.dealer
                ? 'DISTRIBUA AS CARTAS'
                : 'INICIANDO A RODADA\nAGUARDE!'}
            </ThemedText>
            <ThemedView />
            {roundNumber > 0 && (
              <ThemedView>
                <ThemedText>{`${cardQuantity || '-'} carta${
                  cardQuantity === 1 ? '' : 's'
                }`}</ThemedText>
                <ThemedText>{`APOSTAS: ${betCount}`}</ThemedText>
              </ThemedView>
            )}
          </ThemedView>

          {me?.dealer && !roundStatus && !isFetching && !isLoading ? (
            <ThemedView
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '30%',
                height: '100%',
                backgroundColor: Colors.dark.tint,
                borderRadius: 10,
              }}
            >
              <ThemedButton
                title='dar cartas'
                loading={dealing}
                color='white'
                onPress={handleDeal}
              />
            </ThemedView>
          ) : (
            <ThemedView
              style={{
                maxWidth: '35%',
              }}
            >
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

          <StatusPanel
            currentPlayer={currentPlayer}
            loading={isLoading || isFetching}
            me={me!}
            roundStatus={roundStatus}
          />

          <ThemedView
            style={{
              height: '100%',
              borderRadius: 10,
              borderColor: Colors.dark.tint,
              backgroundColor: Colors.dark.tint,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              width: 60,
            }}
          >
            <ThemedButton
              title='↻'
              loading={isFetching || isLoading}
              color='white'
              onPress={refreshGame}
            />
          </ThemedView>
        </ThemedView>
      </ImageBackground>
    </ThemedView>
  );
}
