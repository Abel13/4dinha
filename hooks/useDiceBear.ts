type AvatarStyle =
  | 'adventurer'
  | 'adventurer-neutral'
  | 'avataaars'
  | 'avataaars-neutral'
  | 'big-ears'
  | 'big-ears-neutral'
  | 'big-smile'
  | 'bottts'
  | 'bottts-neutral'
  | 'croodles'
  | 'croodles-neutral'
  | 'dylan'
  | 'fun-emoji'
  | 'glass'
  | 'icons'
  | 'identicon'
  | 'initials'
  | 'lorelei'
  | 'lorelei-neutral'
  | 'micah'
  | 'miniavs'
  | 'notionists'
  | 'notionists-neutral'
  | 'open-peeps'
  | 'open-peeps'
  | 'pixel-art'
  | 'pixel-art-neutral'
  | 'rings'
  | 'shapes'
  | 'thumbs';

interface Props {
  version?: number;
  avatar: AvatarStyle;
  seed?: string;
  scale?: number;
}

export const useDiceBear = () => {
  return ({ version = 9, avatar, seed, scale = 90 }: Props) =>
    `https://api.dicebear.com/${version}.x/${avatar}/png?seed=${seed}&scale=${scale}`;
};
