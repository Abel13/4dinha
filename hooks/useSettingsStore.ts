import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type VolumeType = 'general' | 'ui' | 'effects' | 'music';

interface SettingsState {
  soundEnabled: boolean;
  generalVolume: number;
  musicVolume: number;
  uiVolume: number;
  effectsVolume: number;
  vibrationEnabled: boolean;
  toggleSound: () => void;
  toggleVibration: () => void;
  getVolume: (type: VolumeType) => number;
  setVolume: (newVolume: number, type: VolumeType) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      soundEnabled: true,
      vibrationEnabled: true,
      effectsVolume: 1,
      generalVolume: 1,
      musicVolume: 1,
      uiVolume: 1,
      toggleSound: () =>
        set((state) => ({
          soundEnabled: !state.soundEnabled,
        })),
      setVolume: (newVolume, type) => {
        set(() => ({
          [`${type}Volume`]: newVolume,
        }));
      },
      getVolume: (type) => {
        const multiplier = type === 'general' ? 1 : get().generalVolume;
        return get()[`${type}Volume`] * multiplier;
      },
      toggleVibration: () =>
        set((state) => ({
          vibrationEnabled: !state.vibrationEnabled,
        })),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
