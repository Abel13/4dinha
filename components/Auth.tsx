import { Platform, Pressable, Text } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useState, useEffect } from 'react';
import { AppleCredential, useAppleAuth } from '@/hooks/useAppleAuth';
import { ThemedText } from '@/components/ThemedText';
import { useTranslation } from '@/hooks/useTranslation';

type AuthMode = 'signIn' | 'signUp';

interface AuthProps {
  mode?: AuthMode;
  username?: string;
  handleCredential: (credential: AppleCredential, username?: string) => void;
}

export function Auth({
  mode = 'signIn',
  username,
  handleCredential,
}: AuthProps) {
  const [isAvailable, setIsAvailable] = useState(false);
  const {
    getCredential,
    loading: appleLoading,
    error: appleError,
  } = useAppleAuth();

  const loading = appleLoading;
  const error = appleError;
  const isDisabled = mode === 'signUp' && !username;
  const { t } = useTranslation(mode === 'signUp' ? 'register' : 'login');

  useEffect(() => {
    if (Platform.OS === 'ios') {
      AppleAuthentication.isAvailableAsync().then(setIsAvailable);
    }
  }, []);

  const handlePress = async () => {
    if (mode === 'signUp' && !username) {
      return;
    }
    const credential = await getCredential();
    if (credential) {
      handleCredential(credential, username);
    }
  };

  if (Platform.OS === 'ios' && isAvailable) {
    return (
      <>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={
            mode === 'signUp'
              ? AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP
              : AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
          }
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
          cornerRadius={5}
          style={{
            width: '100%',
            height: 50,
            opacity: loading || isDisabled ? 0.5 : 1,
          }}
          onPress={loading || isDisabled ? () => {} : handlePress}
        />
        {error && <ThemedText type='error'>{error}</ThemedText>}
      </>
    );
  }

  if (Platform.OS === 'ios' && !isAvailable) {
    return (
      <Text style={{ color: 'white' }}>
        Apple Sign In is not available. Please use a real device (not
        simulator).
      </Text>
    );
  }

  return (
    <Pressable
      onPress={loading || isDisabled ? () => {} : handlePress}
      style={{
        width: '100%',
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: loading || isDisabled ? 0.5 : 1,
      }}
    >
      <Text style={{ color: '#000', fontWeight: '600' }}>
        {t('appleButton')}
      </Text>
    </Pressable>
  );
}
