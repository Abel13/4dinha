import { Collapsible } from '@/components/Collapsible';
import { SoundButton } from '@/components/SoundButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useSound } from '@/hooks/useAudioConfig';
import { useSettingsStore } from '@/hooks/useSettingsStore';
import { Feather } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Switch } from 'react-native';

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    padding: 10,
    backgroundColor: Colors.dark.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.blackTransparent07,
  },
  content: {
    width: '50%',
    height: '80%',
    borderRadius: 10,
    backgroundColor: Colors.dark.info,
    overflow: 'hidden',
  },
  setting: { marginBottom: 10 },
  settings: { padding: 10, paddingRight: 40 },
  label: {},
  slider: {},
});

export default function Settings() {
  const {
    toggleSound,
    setVolume,
    soundEnabled,
    generalVolume,
    uiVolume,
    effectsVolume,
    musicVolume,
  } = useSettingsStore((store) => store);
  const { playSoundAsync, stopSoundAsync } = useSound('ambient');

  useEffect(() => {
    playSoundAsync({
      looping: true,
    });

    return () => {
      stopSoundAsync();
    };
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type='h4'>Configurações</ThemedText>
          <SoundButton sound='menu' onPress={router.back}>
            <Feather name='x-circle' color={Colors.dark.text} size={24} />
          </SoundButton>
        </ThemedView>
        <ScrollView style={styles.settings}>
          <Collapsible title='Audio' key='audio' startOpen>
            <ThemedView style={styles.setting}>
              <ThemedText style={styles.label}>Sons</ThemedText>
              <Switch
                style={styles.slider}
                value={soundEnabled}
                onValueChange={toggleSound}
              />
            </ThemedView>
            {soundEnabled && (
              <ThemedView>
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
            )}
          </Collapsible>
          <ThemedView style={{ height: 60 }} />
        </ScrollView>
      </ThemedView>
    </ThemedView>
  );
}
