import { FlatList, type FlatListProps, StyleSheet } from 'react-native';
import FailToLoadAnimation from '@/assets/lotties/nothing.json';
import { ThemedView } from './ThemedView';
import { Lottie } from './Lottie';

const styles = StyleSheet.create({
  default: {
    flex: 1,
  },
});

export type ThemedFlatListProps = FlatListProps<any> & {};

export function ThemedFlatList({ style, ...rest }: ThemedFlatListProps) {
  const renderSeparator = () => {
    return <ThemedView style={{ height: 5, width: 5 }} />;
  };
  return (
    <FlatList
      style={[style, styles.default]}
      ItemSeparatorComponent={renderSeparator}
      ListEmptyComponent={<Lottie source={FailToLoadAnimation} />}
      {...rest}
    />
  );
}
