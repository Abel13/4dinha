import { TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface MenuIconProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  onPress: () => void;
}

const MenuIcon: React.FC<MenuIconProps> = ({ icon, text, onPress }) => {
  const theme = useColorScheme() || 'dark';

  return (
    <TouchableOpacity onPress={onPress} style={styles.footerItem}>
      <Ionicons name={icon} size={36} color={Colors[theme].icon} />
      <ThemedText type="default">{text}</ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  footerItem: {
    alignItems: 'center',
  },
});

export default MenuIcon;
