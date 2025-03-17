import {
  TouchableOpacity,
  StyleSheet,
  type ButtonProps,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useCallback, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { SoundEffects, useSound } from '@/hooks/useAudioConfig';
import { useHaptics } from '@/hooks/useHaptics';
import { ImpactFeedbackStyle } from 'expo-haptics';
import { ThemedText } from './ThemedText';

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
  },
});

type ButtonType = 'default' | 'danger' | 'outlined';

export type ThemedButtonProps = ButtonProps & {
  type?: ButtonType;
  loading?: boolean;
  style?: ViewStyle;
  sound?: keyof typeof SoundEffects;
};

const TypeColors = {
  default: Colors.dark.tint,
  danger: Colors.dark.danger,
  outlined: Colors.dark.tint,
};

export function ThemedButton({
  type = 'default',
  loading = false,
  title,
  sound = 'menu',
  disabled = false,
  color,
  style,
  onPress,
  ...rest
}: ThemedButtonProps) {
  const rotation = useSharedValue(0);
  const { playSoundAsync } = useSound(sound);
  const { impact } = useHaptics();

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (onPress) {
        if (sound) playSoundAsync();

        onPress(event);
        impact(ImpactFeedbackStyle.Soft);
      }
    },
    [impact, onPress, playSoundAsync, sound],
  );

  useEffect(() => {
    if (loading) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 500 }),
        -1,
        false,
      );
    } else {
      rotation.value = 0;
    }
  }, [loading, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rotation.value}deg`,
      },
    ],
  }));

  const buttonStyles = [
    styles.button,
    type === 'outlined' && {
      borderWidth: 2,
      borderColor: Colors.dark.tint,
    },
    disabled && { opacity: 0.5 },
    style,
  ];

  if (loading)
    return (
      <Animated.View
        style={[
          animatedStyle,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Feather name='loader' color={color || TypeColors[type]} size={24} />
      </Animated.View>
    );

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={disabled}
      activeOpacity={0.5}
      onPress={handlePress}
      {...rest}
    >
      <ThemedText
        style={{
          color: !disabled
            ? color || TypeColors[type]
            : Colors.dark.disabledButton,
        }}
        type='subtitle'
      >
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}
