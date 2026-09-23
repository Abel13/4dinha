import { Children, ReactNode } from 'react';
import {
  ScrollView,
  StyleProp,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

interface PagerProps {
  initialPage?: number;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export default function Pager({ style, children }: PagerProps) {
  const { width } = useWindowDimensions();

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={style}
    >
      {Children.map(children, (child, index) => (
        <View key={index} style={{ width }}>
          {child}
        </View>
      ))}
    </ScrollView>
  );
}
