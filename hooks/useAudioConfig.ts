import { useEffect, useState } from 'react';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { useSettingsStore } from './useSettingsStore';

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

const sounds = {
  menu: require('@/assets/sounds/touch1.mp3'),
  ambient: require('@/assets/sounds/ambient.mp3'),
};

export type SoundEffects = 'menu' | 'ambient';

interface PlayProps {
  type: SoundEffects;
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

    const { sound } = await Audio.Sound.createAsync(sounds[type], {
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
