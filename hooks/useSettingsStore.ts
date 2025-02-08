import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SettingsState {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  toggleSound: () => void;
  toggleVibration: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    set => ({
      soundEnabled: true,
      vibrationEnabled: true,
      toggleSound: () =>
        set(state => ({
          soundEnabled: !state.soundEnabled,
        })),
      toggleVibration: () =>
        set(state => ({
          vibrationEnabled: !state.vibrationEnabled,
        })),
    }),
    {
      name: 'settings-storage', // Nome da chave no armazenamento
      partialize: state => ({
        // Define quais campos devem ser persistidos
        soundEnabled: state.soundEnabled,
        vibrationEnabled: state.vibrationEnabled,
      }),
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
