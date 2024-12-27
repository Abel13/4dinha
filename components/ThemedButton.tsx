import { Button, ButtonProps } from 'react-native';
import { Colors } from '@/constants/Colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';

type ButtonType = 'default' | 'danger' | 'outlined';

export type ThemedButtonProps = ButtonProps & {
  type?: ButtonType;
  loading?: boolean;
};

export function ThemedButton({
  type = 'default',
  loading = false,
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
        <Feather name='loader' color={Colors.dark.tint} size={24} />
      </Animated.View>
    );

  return <Button color={Colors.dark.tint} {...rest} />;
}
