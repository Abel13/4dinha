import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface CircularProgressBarProps {
  totalSegments: number;
  filledSegments: number;
  size?: number;
  strokeWidth?: number;
  glowIntensity?: number;
  children?: React.ReactNode;
}

export default function Lives({
  totalSegments,
  filledSegments,
  size = 200,
  strokeWidth = 8,
  glowIntensity = 3,
  children,
}: CircularProgressBarProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const segmentGap = 8;
  const segmentAngle = 360 / totalSegments;

  const renderSegments = () => {
    const segments = [];

    for (let i = 0; i < totalSegments; i++) {
      const isFilled = i < filledSegments;
      const startAngle = i * segmentAngle - 90;
      const gapAngle = (segmentGap / circumference) * 360;
      const arcAngle = segmentAngle - gapAngle;

      const segmentCircumference = (arcAngle / 360) * circumference;
      const dashArray = `${segmentCircumference} ${
        circumference - segmentCircumference
      }`;
      const rotation = startAngle + segmentAngle / 2;

      segments.push(
        <Circle
          key={`segment-${i}`}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={isFilled ? 'url(#neonGradient)' : '#1a1a2e'}
          strokeWidth={strokeWidth}
          fill='none'
          strokeDasharray={dashArray}
          strokeDashoffset={0}
          rotation={rotation}
          origin={`${size / 2}, ${size / 2}`}
          strokeLinecap='square'
          opacity={isFilled ? 1 : 0.7}
        />,
      );

      if (isFilled) {
        for (let j = 1; j <= glowIntensity; j++) {
          segments.push(
            <Circle
              key={`glow-${i}-${j}`}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke='#00d4ff'
              strokeWidth={strokeWidth + j * 2}
              fill='none'
              strokeDasharray={dashArray}
              strokeDashoffset={0}
              rotation={rotation}
              origin={`${size / 2}, ${size / 2}`}
              strokeLinecap='square'
              opacity={0.15 / j}
            />,
          );
        }
      }
    }

    return segments;
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id='neonGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
            <Stop offset='0%' stopColor='#00d4ff' stopOpacity='1' />
            <Stop offset='50%' stopColor='#0099ff' stopOpacity='1' />
            <Stop offset='100%' stopColor='#0066ff' stopOpacity='1' />
          </LinearGradient>
        </Defs>

        {renderSegments()}
      </Svg>

      <ThemedView style={{ position: 'absolute' }}>{children}</ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
