import Rive, { Alignment, Fit } from 'rive-react-native';
import { StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    margin: 80,
  },
  animation: {
    width: '100%',
    height: 300,
  },
});

export function Loading() {
  return (
    <ThemedView style={styles.content}>
      <Rive
        fit={Fit.Contain}
        alignment={Alignment.Center}
        style={styles.animation}
        artboardName='Swipe'
        autoplay
        source={require('@/assets/rive/swipe.riv')}
      />
    </ThemedView>
  );
}
