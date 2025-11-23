import { AppleCredential } from '@/hooks/useAppleAuth';
import { Text, View } from 'react-native';

type AuthMode = 'signIn' | 'signUp';

interface AuthProps {
  mode?: AuthMode;
  username?: string;
  handleCredential: (credential: AppleCredential, username: string) => void;
}

export const Auth = ({ mode = 'signIn' }: AuthProps) => {
  return (
    <View>
      <Text>{mode}</Text>
    </View>
  );
};
