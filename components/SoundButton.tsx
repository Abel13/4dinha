import { useSound, SoundEffectKey } from '@/hooks/useAudioConfig';
import { useHaptics } from '@/hooks/useHaptics';
import { ImpactFeedbackStyle } from 'expo-haptics';
import { useCallback } from 'react';
import {
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface Props extends TouchableOpacityProps {
  sound: SoundEffectKey;
}

export function SoundButton({ children, sound, onPress, ...rest }: Props) {
  const { playSound } = useSound(sound);
  const { impact } = useHaptics();

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (onPress) {
        playSound({});
        onPress(event);
        impact(ImpactFeedbackStyle.Soft);
      }
    },
    [impact, onPress, playSound],
  );

  return (
    <TouchableOpacity onPress={handlePress} {...rest}>
      {children}
    </TouchableOpacity>
  );
}
