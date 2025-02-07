import React, { ReactNode, useEffect, useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { ThemedText } from '../ThemedText';

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

export const Card: React.FC<CardProps> = ({
  backgroundColor = '#fff',
  frontBorderColor = '#fff',
  backBorderColor = '#FFF',
  style,
  scale = 0.5,
  front,
  back,
  borderless = false,
}) => {
  const resizedWidth = WIDTH * scale;
  const resizedHeight = HEIGHT * scale;
  const resizedBorder = 10 * scale;
  const resizedRadius = 50 * scale;

  const tilt = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const flipAnim = useRef(new Animated.Value(0)).current;

  const [flipped, setFlipped] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const [showOtherSide, setShowOtherSide] = useState(false);

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
          setFlipping(true);
          Animated.parallel([
            Animated.timing(flipAnim, {
              toValue: flipped ? 0 : gestureState.dx > 0 ? 180 : -180,
              useNativeDriver: true,
            }),
            Animated.spring(tilt, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: true,
            }),
          ]).start(() => {
            setFlipped((prev) => {
              const newFlipped = !prev;
              setFlipping(false);

              flipAnim.setValue(0);
              return newFlipped;
            });
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
    outputRange: ['-40deg', '40deg'],
    extrapolate: 'clamp',
  });

  const rotateYFlip = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const rotateY = flipping ? rotateYFlip : rotateYTilt;

  const animatedStyle = {
    width: resizedWidth,
    height: resizedHeight,
    transform: [{ perspective: 1000 }, { rotateX }, { rotateY }],
  };

  useEffect(() => {
    const listener = flipAnim.addListener(({ value }) => {
      setShowOtherSide(Math.abs(value) >= 90);
    });

    return () => {
      flipAnim.removeListener(listener);
    };
  }, [rotateYFlip]);

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        animatedStyle,
        styles.card,
        { width: resizedWidth, height: resizedHeight },
        { backgroundColor, borderRadius: resizedRadius },
        style,
      ]}
    >
      {(showOtherSide && flipped) || (!showOtherSide && !flipped) ? (
        <View style={[showOtherSide ? styles.flip : { flex: 1 }]}>
          <View
            style={[
              {
                borderColor: backBorderColor,
                borderWidth: borderless ? 0 : resizedBorder,
                borderRadius: resizedRadius,
              },
              styles.art,
            ]}
          >
            {back}
          </View>
        </View>
      ) : (
        <View style={[showOtherSide ? styles.flip : { flex: 1 }]}>
          <View
            style={[
              {
                borderColor: frontBorderColor,
                borderWidth: borderless ? 0 : resizedBorder,
                borderRadius: resizedRadius,
              },
              styles.art,
            ]}
          >
            {front}
          </View>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
  art: {
    flex: 1,
    zIndex: -1000,
    overflow: 'hidden',
  },
  flip: {
    flex: 1,
    backfaceVisibility: 'visible',
    transform: [
      {
        rotateY: '180deg',
      },
    ],
  },
});
