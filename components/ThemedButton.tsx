import { TouchableOpacity, StyleSheet, type ButtonProps } from 'react-native';

import { Colors } from '@/constants/Colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';

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

export const ThemedButton = ({
  type = 'default',
  loading = false,
  title,
  disabled = false,
  ...rest
}: ThemedButtonProps) => {
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
  }, [loading]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rotation.value}deg`,
      },
    ],
  }));

  if (loading)
    return (
      <Animated.View
        style={[
          animatedStyle,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Feather name="loader" color={Colors.dark.tint} size={24} />
      </Animated.View>
    );

  const buttonStyles = [
    styles.button,
    type === 'outlined' && {
      borderWidth: 2,
      borderColor: Colors.dark.tint,
    },
    disabled && { opacity: 0.5 },
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={disabled}
      activeOpacity={0.5}
      {...rest}
    >
      <ThemedText
        style={{
          color: !disabled ? TypeColors[type] : Colors.dark.disabledButton,
        }}
      >
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
  },
});
