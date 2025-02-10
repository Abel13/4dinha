import { useSound } from '@/hooks/useAudioConfig';
import { useSettingsStore } from '@/hooks/useSettingsStore';
import { useCallback } from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { TouchableOpacityProps } from 'react-native-gesture-handler';

interface Props extends TouchableOpacityProps {
  sound: 'menu';
}

export function SoundButton({ children, sound, onPress, ...rest }: Props) {
  const { soundEnabled } = useSettingsStore((state) => state);
  const playSound = useSound(soundEnabled);

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (onPress) {
        playSound(sound);
        onPress(event);
      }
    },
    [onPress, playSound, sound],
  );

  return (
    <TouchableOpacity onPress={handlePress} {...rest}>
      {children}
    </TouchableOpacity>
  );
}
