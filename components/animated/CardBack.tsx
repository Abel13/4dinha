import React, { ReactNode, useRef } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface CardBackProps {
  /**
   * Cor de fundo da carta (ou pode ser customizado para usar um ImageBackground).
   */
  backgroundColor?: string;
  borderColor?: string;
  /**
   * Estilos adicionais para personalização do container da carta.
   */
  style?: ViewStyle;
  /**
   * Porcentagem da altura original 570x800
   * @default 0.5
   * @satisfies 0 < size < 1
   */
  scale?: number;
  children?: ReactNode;
}

const WIDTH = 570;
const HEIGHT = 800;

export const CardBack: React.FC<CardBackProps> = ({
  backgroundColor = '#fff',
  borderColor = '#fff',
  style,
  children,
  scale = 0.5,
}) => {
  const resizedWidth = WIDTH * scale;
  const resizedHeight = HEIGHT * scale;

  // Animated.ValueXY para rastrear os deslocamentos dx e dy
  const tilt = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  // Cria um PanResponder para capturar os gestos do usuário
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Atualiza o valor do tilt com o deslocamento
        tilt.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: () => {
        // Anima a volta para a posição neutra ao liberar o toque
        Animated.spring(tilt, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  // Interpola o valor vertical para rotação em X:
  // - Quando o usuário arrasta para cima (dy negativo), rotateX fica negativo (inclina para frente)
  // - Quando arrasta para baixo, rotateX fica positivo (inclina para trás)
  const rotateX = tilt.y?.interpolate({
    inputRange: [-100, 100],
    outputRange: ['20deg', '-20deg'],
    extrapolate: 'clamp',
  });

  // Interpola o valor horizontal para rotação em Y:
  // Queremos que ao arrastar para a esquerda (dx negativo) o lado esquerdo se aproxime.
  // Para isso, invertemos a saída: dx negativo gera um valor positivo para rotateY.
  const rotateY = tilt.x.interpolate({
    inputRange: [-100, 100],
    outputRange: ['-20deg', '20deg'],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.card,
        { width: resizedWidth, height: resizedHeight },
        { backgroundColor },
        style,
        {
          transform: [
            { perspective: 1000 }, // Perspectiva para efeito 3D
            { rotateX },
            { rotateY },
          ],
        },
      ]}
    >
      <View style={[{ borderColor }, styles.art]}>{children}</View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: '#fff',
    transform: [
      { perspective: 1000 },
      { rotateX: '10deg' },
      { rotateY: '5deg' },
    ],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
  art: {
    flex: 1,
    borderRadius: 20,
    zIndex: -1000,
    overflow: 'hidden',
    borderWidth: 5,
  },
});
