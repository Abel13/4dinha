import { useEffect, useRef, useState } from 'react';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { useSettingsStore, VolumeType } from './useSettingsStore';

export const SoundEffects = {
  ambient: {
    type: 'music',
    uri: require('@/assets/sounds/ambient.mp3'),
  },
  card: {
    type: 'effects',
    uri: require('@/assets/sounds/card.wav'),
  },
  changePlayer: {
    type: 'effects',
    uri: require('@/assets/sounds/change-player.wav'),
  },
  currentPlayer: {
    type: 'effects',
    uri: require('@/assets/sounds/current-player.wav'),
  },
  negativeTouch: {
    type: 'effects',
    uri: require('@/assets/sounds/negative-touch.wav'),
  },
  collapse: {
    type: 'ui',
    uri: require('@/assets/sounds/collapse.wav'),
  },
  menu: {
    type: 'ui',
    uri: require('@/assets/sounds/touch.wav'),
  },
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
  looping: boolean;
}

export const useSound = (soundEffect: keyof typeof SoundEffects) => {
  const currentSoundRef = useRef<Audio.Sound | null>(null);

  const {
    soundEnabled,
    effectsVolume,
    generalVolume,
    musicVolume,
    uiVolume,
    getVolume,
  } = useSettingsStore((store) => store);

  const setVolumeAsync = (volume: number) => {
    if (!currentSoundRef.current) return;
    if (volume <= 1 || volume >= 0) {
      currentSoundRef.current.setVolumeAsync(volume);
    }
  };

  const stopSoundAsync = () => {
    if (!currentSoundRef.current) return;
    currentSoundRef.current.stopAsync();
  };

  const playSoundAsync = async (props?: PlayProps) => {
    const looping = !!props?.looping;
    if (!soundEnabled) return;

    const { sound } = await Audio.Sound.createAsync(
      SoundEffects[soundEffect].uri,
      {
        volume: getVolume(SoundEffects[soundEffect].type as VolumeType),
      },
    );

    await sound.playAsync();
    await sound.setIsLoopingAsync(looping);

    // Atualiza a referência em vez de usar useState
    currentSoundRef.current = sound;
  };

  useEffect(() => {
    if (currentSoundRef.current)
      currentSoundRef.current.setIsMutedAsync(!soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    setVolumeAsync(getVolume(SoundEffects[soundEffect].type as VolumeType));
  }, [generalVolume, musicVolume, uiVolume, effectsVolume]);

  return {
    playSoundAsync,
    stopSoundAsync,
  };
};
