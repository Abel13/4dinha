import { SoundButton } from '@/components/SoundButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useSound } from '@/hooks/useAudioConfig';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

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
  const { playSound, stopSound } = useSound('ambient');

  useEffect(() => {
    playSound({
      looping: true,
    });

    return () => {
      stopSound();
    };
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type='h4'>Chat</ThemedText>
          <SoundButton sound='menu' onPress={router.back}>
            <Feather name='x-circle' color={Colors.dark.text} size={24} />
          </SoundButton>
        </ThemedView>
        <ScrollView style={styles.settings}>
          <ThemedView style={{ height: 60 }} />
        </ScrollView>
      </ThemedView>
    </ThemedView>
  );
}
