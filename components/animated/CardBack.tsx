import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, StyleSheet, ViewStyle } from 'react-native';

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
  // Cálculo das dimensões e estilos
  const resizedWidth = WIDTH * scale;
  const resizedHeight = HEIGHT * scale;
  const resizedBorder = 10 * scale;
  const resizedRadius = 50 * scale;

  // Valores animados: um para o tilt (movimento do gesto) e outro para o flip (rotação acumulada)
  const tilt = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const flipAnim = useRef(new Animated.Value(0)).current;

  // Estado que guarda o ângulo cumulativo atual (em graus)ivo
  const [currentAngle, setCurrentAngle] = useState(0);

  const [isBackside, setIsBackside] = useState(false);
  const [lastDirection, setLastDirection] = useState<number | null>(null);

  const currentAngleRef = useRef(currentAngle);
  // Configuração do PanResponder para detectar o gesto de flip
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Se desejar, pode aplicar um tilt enquanto arrasta
        tilt.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        const flipThreshold = 80;
        if (Math.abs(gestureState.dx) > flipThreshold) {
          // Define a direção do gesto:
          // dx > 0 → direção 1; dx <= 0 → direção -1
          const direction = gestureState.dx > 0 ? 1 : -1;
          let newAngle = currentAngleRef.current;

          if (!isBackside) {
            // Se a frente está ativa, um flip de 180° a leva para o verso
            newAngle = currentAngleRef.current + direction * 180;
            setIsBackside(true);
            setLastDirection(direction);
          } else {
            // Se o verso já está ativo...
            if (direction === lastDirection) {
              // Mesma direção: adiciona 360° para manter o verso ativo
              newAngle = currentAngleRef.current + direction * 360;
              // isBackside permanece true
            } else {
              // Direção contrária: soma 180° para voltar para a frente
              newAngle = currentAngleRef.current + direction * 180;
              setIsBackside(false);
              setLastDirection(direction);
            }
          }

          Animated.sequence([
            Animated.timing(flipAnim, {
              toValue: newAngle,
              duration: 1000,
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
          // Se não ultrapassar o threshold, reseta apenas o tilt
          Animated.spring(tilt, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  // Interpolations para o tilt (movimento enquanto arrasta)
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

  /*
    Para permitir rotações contínuas, definimos um inputRange que abrange vários "ciclos" de 180°.
    Aqui, usamos [0, 180, 360, 540] e repetimos o padrão.
    Assim, se o usuário girar duas vezes na mesma direção (0 -> 180 -> 360),
    a face da frente será visível quando o valor (mod 360) for 0 e a face de trás quando for 180.
  */
  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180, 360, 540],
    outputRange: ['0deg', '180deg', '0deg', '180deg'],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180, 360, 540],
    outputRange: ['180deg', '360deg', '180deg', '360deg'],
  });

  // O container principal aplica o tilt (com perspectiva)
  const containerStyle = {
    width: resizedWidth,
    height: resizedHeight,
    transform: [
      { perspective: 1000 },
      { rotateX: rotateX },
      { rotateY: rotateYTilt },
    ],
  };

  useEffect(() => {
    currentAngleRef.current = currentAngle;
  }, [currentAngle]);

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[containerStyle, styles.card, style]}
    >
      {/* Face da frente */}
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

      {/* Face de trás */}
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
};

const styles = StyleSheet.create({
  card: {},
  // Cada face ocupa o container por completo e oculta sua "costas"
  face: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
  },
});
