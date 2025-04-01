import { StyleSheet, useColorScheme } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useUserSessionStore } from '@/hooks/useUserSessionStore';
import { Colors } from '@/constants/Colors';
import { ConstructionMaterials } from '@/components/MaterialName';

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 100,
    width: 100,
    bottom: 10,
    left: 10,
    position: 'absolute',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
});

export default function HomeScreen() {
  const { username } = useUserSessionStore((state) => state);

  const theme = useColorScheme() || 'dark';

  return (
    <ThemedView style={styles.titleContainer}>
      <Feather
        name='chevron-left'
        color={Colors[theme].icon}
        size={28}
        onPress={router.back}
      />
      <ThemedText type='title'>{`Olá, ${username}!`}</ThemedText>
      <HelloWave />
      <ConstructionMaterials />
    </ThemedView>
  );
}
