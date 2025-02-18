import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSettingsStore } from '@/hooks/useSettingsStore';
import Slider from '@react-native-community/slider';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 60,
    paddingVertical: 20,
  },
  setting: {},
  label: {},
  slider: {},
});

export default function Settings() {
  const { setVolume, generalVolume, uiVolume, effectsVolume, musicVolume } =
    useSettingsStore((store) => store);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.setting}>
        <ThemedText style={styles.label}>
          Volume principal: {(generalVolume * 100).toFixed(0)}
        </ThemedText>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          step={0.05}
          value={generalVolume}
          onValueChange={(value) => setVolume(value, 'general')}
        />
      </ThemedView>
      <ThemedView style={styles.setting}>
        <ThemedText style={styles.label}>
          Volume da interface: {(uiVolume * 100).toFixed(0)}
        </ThemedText>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          step={0.05}
          value={uiVolume}
          onValueChange={(value) => setVolume(value, 'ui')}
        />
      </ThemedView>
      <ThemedView style={styles.setting}>
        <ThemedText style={styles.label}>
          Volume da música: {(musicVolume * 100).toFixed(0)}
        </ThemedText>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          step={0.05}
          value={musicVolume}
          onValueChange={(value) => setVolume(value, 'music')}
        />
      </ThemedView>
      <ThemedView style={styles.setting}>
        <ThemedText style={styles.label}>
          Volume dos efeitos: {(effectsVolume * 100).toFixed(0)}
        </ThemedText>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          step={0.05}
          value={effectsVolume}
          onValueChange={(value) => setVolume(value, 'effects')}
        />
      </ThemedView>
    </ThemedView>
  );
}
