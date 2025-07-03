import { Dimensions, StatusBar, NativeModules, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/**
 * Ajusta o tamanho horizontalmente de acordo com a largura do dispositivo.
 * @param {number} size - O tamanho base a ser ajustado.
 * @returns {number} - O tamanho ajustado proporcionalmente à largura do dispositivo.
 */
const scale = (size: number) => (width / guidelineBaseWidth) * size;

/**
 * Ajusta o tamanho verticalmente de acordo com a altura do dispositivo.
 * @param {number} size - O tamanho base a ser ajustado.
 * @returns {number} - O tamanho ajustado proporcionalmente à altura do dispositivo.
 */
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;

/**
 * Obtém um fator de escala moderado para um ajuste mais controlado dos tamanhos de elementos na UI.
 * @param {number} size - O tamanho base a ser escalado.
 * @param {number} factor - O fator de ajuste (padrão: 0.5).
 * @returns {number} - O tamanho ajustado proporcionalmente à largura do dispositivo considerando o fator.
 */
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

/**
 * Obtém um fator de escala moderado verticalmente para ajustes refinados na altura dos elementos da UI.
 * @param {number} size - O tamanho base a ser escalado verticalmente.
 * @param {number} factor - O fator de ajuste vertical (padrão: 0.5).
 * @returns {number} - O tamanho ajustado proporcionalmente à altura do dispositivo considerando o fator.
 */
const moderateScaleVertical = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

/**
 * Ajusta dinamicamente o tamanho do texto com base na altura da tela do dispositivo.
 * @param {number} percent - Percentual da altura da tela que o texto deve ocupar.
 * @returns {number} - O tamanho do texto ajustado dinamicamente conforme a altura da tela.
 */
const textScale = (percent: number) => {
  const deviceHeight =
    Platform.OS === 'android'
      ? height - (StatusBar.currentHeight || 0)
      : height;

  const heightPercent = (percent * deviceHeight) / 100;
  return Math.round(heightPercent);
};

/**
 * Obtém dinamicamente a altura da barra de status para evitar problemas de layout em diferentes dispositivos e plataformas.
 * @returns {number} - A altura da barra de status, ajustada conforme a plataforma.
 */
const StatusBarHeight = Platform.select({
  ios: StatusBarManager?.HEIGHT || 0,
  android: StatusBar.currentHeight || 0,
  default: 0,
});

export {
  scale,
  verticalScale,
  textScale,
  moderateScale,
  moderateScaleVertical,
  width,
  height,
  StatusBarHeight,
};
