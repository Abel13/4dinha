import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'BarlowCondensed',
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 15,
    fontFamily: 'BarlowCondensedSemiBold',
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    fontFamily: 'BarlowCondensedBold',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'BarlowCondensedBold',
  },
  h4: {
    fontSize: 16,
    fontFamily: 'BarlowCondensedBold',
  },
  paragraph: {
    fontSize: 14,
    fontFamily: 'BarlowCondensed',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: Colors.dark.link,
    fontFamily: 'BarlowCondensed',
  },
  error: {
    lineHeight: 12,
    fontSize: 12,
    color: Colors.dark.danger,
    fontFamily: 'BarlowCondensed',
  },
  outdoor: {
    fontSize: 80,
    fontFamily: 'BarlowCondensed',
  },
});

export type ThemedTextProps = TextProps & {
  darkColor?: string;
  lightColor?: string;
  type?:
    | 'default'
    | 'title'
    | 'defaultSemiBold'
    | 'subtitle'
    | 'h4'
    | 'paragraph'
    | 'link'
    | 'error'
    | 'outdoor';
};

export function ThemedText({
  style,
  darkColor,
  lightColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ dark: darkColor, light: lightColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'h4' ? styles.h4 : undefined,
        type === 'paragraph' ? styles.paragraph : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'error' ? styles.error : undefined,
        type === 'outdoor' ? styles.outdoor : undefined,
        style,
      ]}
      {...rest}
    />
  );
}
