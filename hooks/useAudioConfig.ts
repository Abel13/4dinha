import { useEffect } from 'react';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';

export const useAudioConfig = () => {
  useEffect(() => {
    const configureAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: InterruptionModeIOS.MixWithOthers,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: true,
        });
      } catch (error) {
        console.error('Audio configuration failed', error);
      }
    };
    configureAudio();
  }, []);
};

export type SoundEffects = 'menu';

interface Props {
  enabled?: boolean;
  volume?: number;
}

export const useSound = ({ enabled, volume = 1 }: Props) => {
  const playSound = async (type: SoundEffects) => {
    if (!enabled) return;

    const sounds = {
      menu: require('@/assets/sounds/touch1.mp3'),
    };

    const { sound } = await Audio.Sound.createAsync(sounds[type], {
      volume,
    });
    await sound.playAsync();
  };

  return playSound;
};
