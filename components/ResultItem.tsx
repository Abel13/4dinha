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
        borderWidth: 1,
        borderColor: Colors.dark.tabIconDefault,
        padding: 10,
        borderRadius: 10,
        gap: 10,
      }}
    >
      <ThemedView
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
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
          gap: 20,
        }}
      >
        <ThemedText
          type='title'
          lightColor={Colors.dark.text}
        >{`${result.bets}/${result.wins}`}</ThemedText>
        <ThemedText>
          {`${Array.from(Array(lives)).fill('❤️').join('')}${Array.from(
            Array(5 - (lives || 0)),
          )
            .fill('🤍')
            .join('')}`}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
