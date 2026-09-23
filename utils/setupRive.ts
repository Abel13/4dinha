import {
  RiveRenderer,
  RiveRendererAndroid,
  RiveRendererIOS,
} from 'rive-react-native';

export function setupRiveRenderer() {
  RiveRenderer.defaultRenderer(RiveRendererIOS.Rive, RiveRendererAndroid.Rive);
}
