import { Image, ImageProps } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const CustomImage = ({ style, ...rest }: ImageProps) => {
  return (
    <Image
      {...rest}
      style={style}
      placeholder={{ blurhash }}
      contentFit='contain'
      transition={500}
    />
  );
};
