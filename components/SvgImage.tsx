import { View, ViewStyle } from 'react-native';
import { SvgXml, XmlProps } from 'react-native-svg';

interface IProps extends XmlProps {
  containerStyle?: ViewStyle | ViewStyle[];
}

export const SvgImage = ({ xml, containerStyle, ...rest }: IProps) => {
  if (!xml) return null;

  return (
    <View style={[containerStyle, { overflow: 'hidden' }]}>
      <SvgXml xml={xml} {...rest} />
    </View>
  );
};
