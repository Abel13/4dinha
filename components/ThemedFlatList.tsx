import { FlatList, type FlatListProps, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  default: {
    flex: 1,
  },
});

export type ThemedFlatListProps = FlatListProps<any> & {};

export function ThemedFlatList({ style, ...rest }: ThemedFlatListProps) {
  return <FlatList style={[style, styles.default]} {...rest} />;
}
