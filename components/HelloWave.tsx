import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';

interface Props {
  size?: number;
}

export const HelloWave = ({ size = 28 }: Props) => {
  const rotationAnimation = useSharedValue(0);

  useEffect(() => {
    rotationAnimation.value = withRepeat(
      withSequence(
        withTiming(25, { duration: 150 }),
        withTiming(0, { duration: 150 }),
      ),
      4,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <ThemedText style={[styles.text, { fontSize: size }]}>👋</ThemedText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  text: {
    lineHeight: 32,
    marginTop: -6,
  },
});
