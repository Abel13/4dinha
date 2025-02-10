import { FlatList, type FlatListProps, StyleSheet } from 'react-native';

import { Control, useController } from 'react-hook-form';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export type ThemedFlatListProps = FlatListProps<any> & {};

export function ThemedFlatList({ style, ...rest }: ThemedFlatListProps) {
  return <FlatList style={[style, styles.default]} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    flex: 1,
  },
});
