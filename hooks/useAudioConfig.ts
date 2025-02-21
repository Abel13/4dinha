import { useEffect, useState } from 'react';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { useSettingsStore } from './useSettingsStore';

const SoundEffects = {
  ambient: require('@/assets/sounds/ambient.mp3'),
  card: require('@/assets/sounds/card.wav'),
  changePlayer: require('@/assets/sounds/change-player.wav'),
  currentPlayer: require('@/assets/sounds/current-player.wav'),
  collapse: require('@/assets/sounds/collapse.wav'),
  menu: require('@/assets/sounds/touch.wav'),
  negativeTouch: require('@/assets/sounds/negative-touch.wav'),
};

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

interface PlayProps {
  type: keyof typeof SoundEffects;
  volume?: number;
  looping?: boolean;
}

export const useSound = () => {
  const [currentSound, setCurrentSound] = useState<Audio.Sound | null>(null);
  const { soundEnabled } = useSettingsStore((store) => store);

  useEffect(() => {
    if (currentSound) currentSound.setIsMutedAsync(!soundEnabled);
  }, [soundEnabled]);

  const setVolumeAsync = (volume: number) => {
    if (!currentSound) return;
    if (volume <= 1 || volume >= 0) {
      currentSound.setVolumeAsync(volume);
    }
  };

  const stopSoundAsync = () => {
    if (!currentSound) return;
    currentSound.stopAsync();
  };

  const playSoundAsync = async ({
    type,
    volume = 1,
    looping = false,
  }: PlayProps) => {
    if (!soundEnabled) return;

    const { sound } = await Audio.Sound.createAsync(SoundEffects[type], {
      volume,
    });

    await sound.playAsync();
    await sound.setIsLoopingAsync(looping);
    setCurrentSound(sound);
  };

  return {
    playSoundAsync,
    setVolumeAsync,
    stopSoundAsync,
  };
};
