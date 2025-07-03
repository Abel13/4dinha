import { Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { usePlayer } from '@/hooks/usePlayer';
import { type GameResult } from '@/types';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

export function ResultItem({ result }: { result: GameResult }) {
  const { playerName, playerPicture } = usePlayer(result.user_id);
  let lives = result.lives - Math.abs(result.bets - result.wins);
  if (lives < 0) lives = 0;

  return (
    <ThemedView
      key={result.user_id}
      style={{
        padding: 10,
        borderRadius: 10,
        gap: 10,
      }}
    >
      <ThemedView
        style={{
          alignItems: 'center',
        }}
      >
        {playerPicture && (
          <Image
            source={{
              uri: playerPicture,
            }}
            style={{
              width: 35,
              height: 35,
              borderRadius: 18,
            }}
          />
        )}
        <ThemedText type='subtitle' lightColor={Colors.dark.text}>
          {playerName}
        </ThemedText>
      </ThemedView>
      <ThemedView
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <ThemedView>
          <ThemedText type='title'>❤️</ThemedText>
          <ThemedText
            type='defaultSemiBold'
            style={{ position: 'absolute', top: '30%', left: '40%' }}
          >
            {result.lives - Math.abs(result.wins - result.bets)}
          </ThemedText>
        </ThemedView>
        <ThemedText
          type='title'
          lightColor={Colors.dark.text}
        >{`${result.wins}/${result.bets}`}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
