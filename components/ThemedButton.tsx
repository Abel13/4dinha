import {
  TouchableOpacity,
  StyleSheet,
  type ButtonProps,
  ViewStyle,
  GestureResponderEvent,
  View,
  Platform,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { ReactNode, useCallback, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useSound, SoundEffectKey } from '@/hooks/useAudioConfig';
import { useHaptics } from '@/hooks/useHaptics';
import { ImpactFeedbackStyle } from 'expo-haptics';
import { ThemedText } from './ThemedText';
import { Loading } from './Loading';

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
    maxHeight: 50,
    minHeight: 50,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 4,
  },
  shadow: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowColor: Colors.dark.text,
    boxShadow:
      Platform.OS === 'android'
        ? [
            {
              offsetX: 0,
              offsetY: 0,
              blurRadius: 30,
              color: Colors.dark.text,
              inset: true,
              spreadDistance: 0,
            },
          ]
        : [],
  },
  diagonalBorder: {
    position: 'absolute',
    borderWidth: 1,
    transform: [{ rotate: '45deg' }],
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type ButtonType = 'default' | 'danger' | 'outlined' | 'link';

export type ThemedButtonProps = ButtonProps & {
  type?: ButtonType;
  loading?: boolean;
  style?: ViewStyle;
  sound?: SoundEffectKey;
  children?: ReactNode;
};

const TypeColors = {
  default: Colors.dark.tint,
  danger: Colors.dark.danger,
  outlined: Colors.dark.tint,
  link: Colors.dark.tint,
};

export function ThemedButton({
  type = 'default',
  loading = false,
  title = '',
  sound = 'button',
  disabled = false,
  color,
  style,
  children,
  onPress,
  ...rest
}: ThemedButtonProps) {
  const rotation = useSharedValue(0);
  const { playSound } = useSound(sound);
  const { impact } = useHaptics();

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (onPress) {
        if (sound) playSound({});

        onPress(event);
        impact(ImpactFeedbackStyle.Soft);
      }
    },
    [impact, onPress, playSound, sound],
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
      ...styles.shadow,
    },
    type === 'danger' && {
      shadowColor: Colors.dark.danger,
    },
    type === 'link' && {},
    disabled && { opacity: 0.8, shadowColor: Colors.dark.transparent },
    style,
  ];

  const renderLoading = () => {
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
  };

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={disabled}
      activeOpacity={0.5}
      onPress={handlePress}
      {...rest}
    >
      <View
        style={[
          styles.diagonalBorder,
          {
            width: 10,
            height: 10,
            bottom: 5,
            left: 8,
            borderColor:
              type === 'danger' ? Colors.dark.danger : Colors.dark.shadowText,
          },
        ]}
      />
      <View
        style={[
          styles.diagonalBorder,
          {
            width: 15,
            height: 15,
            top: 12,
            left: 50,
            borderColor:
              type === 'danger' ? Colors.dark.danger : Colors.dark.shadowText,
          },
        ]}
      />
      <View
        style={[
          styles.diagonalBorder,
          {
            width: 50,
            height: 50,
            top: 12,
            right: 80,
            borderColor:
              type === 'danger' ? Colors.dark.danger : Colors.dark.shadowText,
          },
        ]}
      />

      {loading ? (
        renderLoading()
      ) : (
        <View style={styles.content}>
          <ThemedText
            style={[
              {
                textDecorationLine: type === 'link' ? 'underline' : 'none',
                color: !disabled
                  ? color || TypeColors[type]
                  : Colors.dark.disabledButton,
              },
            ]}
            type='subtitle'
          >
            {title}
          </ThemedText>
          {children}
        </View>
      )}
    </TouchableOpacity>
  );
}
