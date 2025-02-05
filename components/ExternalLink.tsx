import { ExpoRouter, Link } from 'expo-router';
import { type ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

export const ExternalLink = ({ href, ...rest }: Props) => {
  return <Link target="_blank" {...rest} href={href as any} />;
};
