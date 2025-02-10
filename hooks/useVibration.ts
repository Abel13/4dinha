import { useCallback } from 'react';
import { Vibration } from 'react-native';

import { useSettingsStore } from './useSettingsStore';

const VIBRATION_DURATION_IN_MS = 500;

export const useVibration = () => {
  const vibrationEnabled = useSettingsStore((state) => state.vibrationEnabled);

  const vibrate = useCallback(() => {
    if (vibrationEnabled) {
      Vibration.vibrate(VIBRATION_DURATION_IN_MS);
    }
  }, [vibrationEnabled]);

  return { vibrate };
};
