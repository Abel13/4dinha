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
  const { soundEnabled, getVolume } = useSettingsStore((state) => state);
  const playSound = useSound({
    enabled: soundEnabled,
    volume: getVolume('ui'),
  });
  const { impact } = useHaptics();

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (onPress) {
        playSound(sound);
        onPress(event);
        impact(ImpactFeedbackStyle.Soft);
      }
    },
    [impact, onPress, playSound, sound],
  );

  return (
    <TouchableOpacity onPress={handlePress} {...rest}>
      {children}
    </TouchableOpacity>
  );
}
