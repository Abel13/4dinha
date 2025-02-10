import { TouchableOpacity, useColorScheme, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { ReactNode } from 'react';
import { SoundButton } from './SoundButton';

const styles = StyleSheet.create({
  footerItem: {
    alignItems: 'center',
  },
});

interface MenuIconProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  onPress: () => void;
}

function MenuIcon({ icon, text, onPress }: MenuIconProps): ReactNode {
  const theme = useColorScheme() || 'dark';

  return (
    <SoundButton sound='menu' onPress={onPress} style={styles.footerItem}>
      <Ionicons name={icon} size={36} color={Colors[theme].icon} />
      <ThemedText type='default'>{text}</ThemedText>
    </SoundButton>
  );
}

export default MenuIcon;
