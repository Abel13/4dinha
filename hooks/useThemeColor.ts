import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

export function useThemeColor(
  props: { dark?: string; light?: string },
  colorName: keyof typeof Colors.dark | keyof typeof Colors.light,
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }
  return Colors[theme][colorName];
}
