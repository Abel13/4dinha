import { useEffect } from 'react';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import { useSettingsStore, VolumeType } from './useSettingsStore';

const SoundEffects = {
  ambient: { type: 'music', uri: require('@/assets/sounds/ambient.mp3') },
  button: { type: 'ui', uri: require('@/assets/sounds/button.mp3') },
  card: { type: 'effects', uri: require('@/assets/sounds/card.wav') },
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
  collapse: { type: 'ui', uri: require('@/assets/sounds/collapse.wav') },
  menu: { type: 'ui', uri: require('@/assets/sounds/touch.wav') },
};

export type SoundEffectKey = keyof typeof SoundEffects;

export const useAudioConfig = () => {
  useEffect(() => {
    setAudioModeAsync({
      allowsRecording: false,
      playsInSilentMode: true,
      interruptionMode: 'duckOthers',
    }).catch(console.error);
  }, []);
};

interface UseSoundReturn {
  playSound: ({ looping }: { looping?: boolean }) => void;
  stopSound: () => void;
}

export const useSound = (effectKey: SoundEffectKey): UseSoundReturn => {
  const {
    soundEnabled,
    getVolume,
    effectsVolume,
    generalVolume,
    musicVolume,
    uiVolume,
  } = useSettingsStore((s) => s);
  const effect = SoundEffects[effectKey];
  const player = useAudioPlayer(effect.uri);

  const volumeChange = effectsVolume + generalVolume + musicVolume + uiVolume;

  useEffect(() => {
    if (!player) return;

    player.volume = !soundEnabled ? 0 : getVolume(effect.type as VolumeType);
    player.loop = false;
  }, [soundEnabled, volumeChange]);

  const playSound = ({ looping = false } = {}) => {
    if (!player) return;

    player.seekTo(0);
    player.loop = looping;
    player.play();
  };

  const stopSound = () => {
    if (!player) return;
    try {
      player.pause();
      player.seekTo(0);
    } catch {
      console.warn('Tried to stop a non-existent player');
    }
  };

  return { playSound, stopSound };
};
