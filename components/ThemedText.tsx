import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedTextProps = TextProps & {
  darkColor?: string;
  type?:
    | 'default'
    | 'title'
    | 'defaultSemiBold'
    | 'subtitle'
    | 'h4'
    | 'link'
    | 'error';
};

export const ThemedText = ({
  style,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) => {
  const color = useThemeColor({ dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'h4' ? styles.h4 : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'error' ? styles.error : undefined,
        style,
      ]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'BarlowCondensed',
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: 'BarlowCondensedSemiBold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
    fontFamily: 'BarlowCondensedBold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'BarlowCondensedBold',
  },
  h4: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'BarlowCondensedBold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: Colors.dark.link,
  },
  error: {
    lineHeight: 16,
    fontSize: 12,
    color: Colors.dark.danger,
  },
});
