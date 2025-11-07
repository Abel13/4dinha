import {
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { ReactNode } from 'react';
import { SoundButton } from './SoundButton';

const styles = StyleSheet.create({
  footerItem: {
    alignItems: 'center',
    shadowColor: Colors.dark.shadowIcon,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 5,
  },
});

interface MenuIconProps extends TouchableOpacityProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  onPress: () => void;
}

function MenuIcon({
  icon,
  text,
  disabled,
  onPress,
  ...rest
}: MenuIconProps): ReactNode {
  const theme = useColorScheme() || 'dark';

  return (
    <SoundButton
      sound='menu'
      onPress={onPress}
      style={styles.footerItem}
      {...rest}
    >
      <Ionicons
        name={icon}
        size={36}
        color={disabled ? Colors[theme].disabledButton : Colors[theme].icon}
      />
      <ThemedText
        type='default'
        darkColor={disabled ? Colors[theme].disabledButton : Colors[theme].text}
        lightColor={
          disabled ? Colors[theme].disabledButton : Colors[theme].text
        }
      >
        {text}
      </ThemedText>
    </SoundButton>
  );
}

export default MenuIcon;
