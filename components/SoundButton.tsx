import { SoundEffects, useSound } from '@/hooks/useAudioConfig';
import { useHaptics } from '@/hooks/useHaptics';
import { ImpactFeedbackStyle } from 'expo-haptics';
import { useCallback } from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { TouchableOpacityProps } from 'react-native-gesture-handler';

interface Props extends TouchableOpacityProps {
  sound: keyof typeof SoundEffects;
}

export function SoundButton({ children, sound, onPress, ...rest }: Props) {
  const { playSoundAsync } = useSound(sound);
  const { impact } = useHaptics();

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (onPress) {
        playSoundAsync();
        onPress(event);
        impact(ImpactFeedbackStyle.Soft);
      }
    },
    [impact, onPress, playSoundAsync],
  );

  return (
    <TouchableOpacity onPress={handlePress} {...rest}>
      {children}
    </TouchableOpacity>
  );
}
