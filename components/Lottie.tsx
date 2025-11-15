import LottieView, { LottieViewProps } from 'lottie-react-native';
import { useRef } from 'react';
import { View } from 'react-native';

interface IProps extends LottieViewProps {}

export function Lottie({ source }: IProps) {
  const animation = useRef(null);

  return (
    <View>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
        }}
        source={source}
      />
    </View>
  );
}
