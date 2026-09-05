import { ActivityIndicator, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    margin: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export function Loading() {
  return (
    <ThemedView style={styles.content}>
      <ActivityIndicator size='large' color='#ffffff' />
    </ThemedView>
  );
}
