import { SoundEffects, useSound } from '@/hooks/useAudioConfig';
import { useHaptics } from '@/hooks/useHaptics';
import { useSettingsStore } from '@/hooks/useSettingsStore';
import { ImpactFeedbackStyle } from 'expo-haptics';
import { useCallback } from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { TouchableOpacityProps } from 'react-native-gesture-handler';

interface Props extends TouchableOpacityProps {
  sound: SoundEffects;
}

export function SoundButton({ children, sound, onPress, ...rest }: Props) {
  const { getVolume } = useSettingsStore((state) => state);
  const { playSoundAsync } = useSound();
  const { impact } = useHaptics();

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (onPress) {
        playSoundAsync({
          type: sound,
          volume: getVolume('ui'),
        });
        onPress(event);
        impact(ImpactFeedbackStyle.Soft);
      }
    },
    [getVolume, impact, onPress, playSoundAsync, sound],
  );

  return (
    <TouchableOpacity onPress={handlePress} {...rest}>
      {children}
    </TouchableOpacity>
  );
}
