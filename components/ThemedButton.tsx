import { TouchableOpacity, StyleSheet, type ButtonProps } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
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
  disabled = false,
  color,
  ...rest
}: ThemedButtonProps) {
  const rotation = useSharedValue(0);

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
