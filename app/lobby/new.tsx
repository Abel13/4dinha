import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { useMatchList } from '@/hooks/useMatchList';
import { Colors } from '@/constants/Colors';
import { SoundButton } from '@/components/SoundButton';
import { useEffect } from 'react';
import { useSound } from '@/hooks/useAudioConfig';

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 60,
  },
});

const schema = yup.object({
  name: yup.string().required('Nome da partida é obrigatório'),
});

export default function NewMatchScreen() {
  const { createMatch, creatingMatch } = useMatchList();
  const { playSound, stopSound } = useSound('ambient');
  function generateRandomCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }

    return code;
  }

  const { handleSubmit, getValues } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: generateRandomCode(),
    },
  });

  useEffect(() => {
    playSound({
      looping: true,
    });

    return () => {
      stopSound();
    };
  }, []);

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedView
        style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
      >
        <SoundButton sound='menu' onPress={router.back}>
          <Feather
            name='chevron-left'
            color={Colors.dark.tabIconDefault}
            size={28}
          />
        </SoundButton>
        <ThemedText type='subtitle'>Nova Partida</ThemedText>
      </ThemedView>
      <ThemedView
        style={{
          flex: 1,
        }}
      >
        <ThemedView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ThemedView
            style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}
          >
            <ThemedText type='outdoor'>{getValues('name')}</ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedButton
          title='CRIAR PARTIDA'
          onPress={handleSubmit(createMatch)}
          loading={creatingMatch}
        />
      </ThemedView>
    </ThemedView>
  );
}
