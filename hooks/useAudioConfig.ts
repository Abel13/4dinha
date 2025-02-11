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

export const useSound = (enabled: boolean) => {
  const playSound = async (type: 'menu') => {
    if (!enabled) return;

    const sounds = {
      menu: require('@/assets/sounds/menu.mp3'),
    };

    const { sound } = await Audio.Sound.createAsync(sounds[type]);
    await sound.playAsync();
  };

  return playSound;
};
