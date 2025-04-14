import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';
import { useSound } from '@/hooks/useAudioConfig';
import { useHaptics } from '@/hooks/useHaptics';

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});

export function Collapsible({
  children,
  title,
  startOpen = false,
}: PropsWithChildren & { title: string; startOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(startOpen);
  const theme = useColorScheme() ?? 'light';

  const { playSoundAsync } = useSound('collapse');
  const { selection } = useHaptics();

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => {
          selection();
          setIsOpen((value) => !value);
          playSoundAsync();
        }}
        activeOpacity={0.8}
      >
        <MaterialIcons
          name='chevron-right'
          size={18}
          weight='medium'
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />

        <ThemedText type='defaultSemiBold'>{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}
