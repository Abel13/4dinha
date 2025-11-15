import { Colors } from '@/constants/Colors';
import { usePlayer } from '@/hooks/usePlayer';
import { type GameResult } from '@/types';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { SvgImage } from './SvgImage';
import Lives from './Lives';

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
        borderWidth: 2,
        borderColor: Colors.dark.border,
      }}
    >
      <ThemedView
        style={{
          alignItems: 'center',
        }}
      >
        {playerPicture && (
          <SvgImage
            xml={playerPicture}
            containerStyle={{
              width: 35,
              height: 35,
              borderRadius: 4,
            }}
          />
        )}
        <ThemedText
          type='defaultSemiBold'
          lightColor={Colors.dark.text}
          numberOfLines={1}
        >
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
        <Lives
          totalSegments={5}
          filledSegments={result.lives - Math.abs(result.wins - result.bets)}
          glowIntensity={1}
          size={40}
          strokeWidth={3}
        >
          <ThemedText type='defaultSemiBold'>
            {result.lives - Math.abs(result.wins - result.bets)}
          </ThemedText>
        </Lives>
        <ThemedText
          type='title'
          lightColor={Colors.dark.text}
        >{`${result.wins}/${result.bets}`}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
