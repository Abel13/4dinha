import { FlatList, type FlatListProps, StyleSheet } from 'react-native';
import FailToLoadAnimation from '@/assets/lotties/nothing.json';
import { ThemedView } from './ThemedView';
import { Lottie } from './Lottie';
import { ThemedText } from './ThemedText';

const styles = StyleSheet.create({
  default: {
    flex: 1,
  },
});

export type ThemedFlatListProps = FlatListProps<any> & {
  emptyMessage?: string;
};

export function ThemedFlatList({
  emptyMessage,
  style,
  ...rest
}: ThemedFlatListProps) {
  const renderSeparator = () => {
    return <ThemedView style={{ height: 5, width: 5 }} />;
  };
  return (
    <FlatList
      style={[style, styles.default]}
      ItemSeparatorComponent={renderSeparator}
      ListEmptyComponent={
        <ThemedView>
          {emptyMessage && (
            <ThemedText type='h4' lightColor='white' darkColor='white'>
              {emptyMessage}
            </ThemedText>
          )}

          <Lottie source={FailToLoadAnimation} />
        </ThemedView>
      }
      {...rest}
    />
  );
}
