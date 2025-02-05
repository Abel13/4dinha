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
  const playSound = async (type: 'pass' | 'correct' | 'start') => {
    if (!enabled) return;

    const sounds = {
      pass: require('../assets/sounds/pass.mp3'),
      correct: require('../assets/sounds/correct.mp3'),
      start: require('../assets/sounds/start.wav'),
    };

    const { sound } = await Audio.Sound.createAsync(sounds[type]);
    await sound.playAsync();
  };

  return playSound;
};
