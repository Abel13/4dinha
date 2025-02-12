import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, StyleSheet, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  card: {},
  face: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
  },
});

interface CardProps {
  backgroundColor?: string;
  frontBorderColor?: string;
  backBorderColor?: string;
  style?: ViewStyle;
  scale?: number;
  front?: ReactNode;
  back?: ReactNode;
  borderless?: boolean;
}

const WIDTH = 570;
const HEIGHT = 800;

export function Card({
  backgroundColor = '#fff',
  frontBorderColor = '#fff',
  backBorderColor = '#FFF',
  style,
  scale = 0.5,
  front,
  back,
  borderless = false,
}: CardProps) {
  const resizedWidth = WIDTH * scale;
  const resizedHeight = HEIGHT * scale;
  const resizedBorder = 10 * scale;
  const resizedRadius = 50 * scale;

  const tilt = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const flipAnim = useRef(new Animated.Value(0)).current;

  const [currentAngle, setCurrentAngle] = useState(0);

  const [isBackside, setIsBackside] = useState(false);
  const [lastDirection, setLastDirection] = useState<number | null>(null);

  const currentAngleRef = useRef(currentAngle);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        tilt.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        const flipThreshold = 80;
        if (Math.abs(gestureState.dx) > flipThreshold) {
          const direction = gestureState.dx > 0 ? -1 : 1;
          let newAngle = currentAngleRef.current;

          if (!isBackside) {
            newAngle = currentAngleRef.current + direction * 180;
            setIsBackside(true);
            setLastDirection(direction);
          } else if (direction === lastDirection)
            newAngle = currentAngleRef.current + direction * 360;
          else {
            newAngle = currentAngleRef.current + direction * 180;
            setIsBackside(false);
            setLastDirection(direction);
          }

          Animated.sequence([
            Animated.timing(flipAnim, {
              toValue: newAngle,
              duration: 3000,
              useNativeDriver: true,
            }),
            Animated.spring(tilt, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: true,
            }),
          ]).start(() => {
            setCurrentAngle(newAngle);
          });
        } else {
          Animated.spring(tilt, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const rotateX = tilt.y.interpolate({
    inputRange: [-100, 100],
    outputRange: ['20deg', '-20deg'],
    extrapolate: 'clamp',
  });
  const rotateYTilt = tilt.x.interpolate({
    inputRange: [-100, 100],
    outputRange: ['-20deg', '20deg'],
    extrapolate: 'clamp',
  });

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180, 360, 540],
    outputRange: ['0deg', '180deg', '0deg', '180deg'],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180, 360, 540],
    outputRange: ['180deg', '360deg', '180deg', '360deg'],
  });

  const containerStyle = {
    width: resizedWidth,
    height: resizedHeight,
    transform: [{ perspective: 1000 }, { rotateX }, { rotateY: rotateYTilt }],
  };

  useEffect(() => {
    currentAngleRef.current = currentAngle;
  }, [currentAngle]);

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[containerStyle, styles.card, style]}
    >
      <Animated.View
        style={[
          styles.face,
          {
            transform: [{ rotateY: frontInterpolate }],
            borderColor: frontBorderColor,
            borderWidth: borderless ? 0 : resizedBorder,
            borderRadius: resizedRadius,
            backgroundColor,
          },
        ]}
      >
        {front}
      </Animated.View>

      <Animated.View
        style={[
          styles.face,
          {
            transform: [{ rotateY: backInterpolate }],
            borderColor: backBorderColor,
            borderWidth: borderless ? 0 : resizedBorder,
            borderRadius: resizedRadius,
            backgroundColor,
          },
        ]}
      >
        {back}
      </Animated.View>
    </Animated.View>
  );
}
