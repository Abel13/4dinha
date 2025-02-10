import { usePlayer } from '@/hooks/usePlayer';
import { GamePlayer } from '@/types';
import { RoundStatus } from '@/types/Round';
import { useCallback, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

interface Props {
  currentPlayer?: GamePlayer;
  roundStatus: RoundStatus;
  me: GamePlayer;
  loading: boolean;
}

export function StatusPanel({
  currentPlayer,
  loading,
  me,
  roundStatus,
}: Props) {
  const { playerName } = usePlayer(currentPlayer?.user_id!);

  const getEmoji = useCallback(
    (
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
    },
    [],
  );

  const getStatus = useCallback(() => {
    if (loading) return '';

    switch (roundStatus) {
      case 'betting': {
        if (me?.current) return 'Sua vez de apostar';
        return `Vez de ${playerName} apostar`;
      }
      case 'playing': {
        if (me?.current) return 'Sua vez de jogar';
        return `Vez de ${playerName} jogar`;
      }
      default: {
        if (me?.dealer) return 'Distribua as cartas';
        if (!roundStatus) return 'O dealer está distribuindo as cartas';
      }
    }
  }, [roundStatus, currentPlayer, loading, me, playerName]);

  return (
    <ThemedView
      style={{
        width: 150,
        gap: 5,
      }}
    >
      <ThemedView
        style={{
          borderWidth: 2,
          borderBottomWidth: 0,
          borderColor: Colors.dark.border,
          backgroundColor: Colors.dark.background,
          borderTopStartRadius: 10,
          borderTopEndRadius: 10,
          height: '100%',
          paddingBottom: 35,
          overflow: 'hidden',
          justifyContent: 'space-between',
        }}
      >
        <ThemedView style={styles.popup}>
          <ThemedText type='h4'>
            {loading ? getEmoji('loading') : getEmoji(roundStatus)}
          </ThemedText>
        </ThemedView>

        <ThemedText type='defaultSemiBold' style={{ padding: 5 }}>
          {getStatus()}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  popup: {
    width: '100%',
    backgroundColor: Colors.dark.info,
    borderBottomWidth: 2,
    padding: 5,
    borderColor: Colors.dark.tint,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
