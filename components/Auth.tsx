import { Platform, Pressable, Text, View } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useState, useEffect } from 'react';
import { AppleCredential, useAppleAuth } from '@/hooks/useAppleAuth';
import { ThemedText } from '@/components/ThemedText';
import { useTranslation } from '@/hooks/useTranslation';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { AntDesign } from '@expo/vector-icons';

type AuthMode = 'signIn' | 'signUp';

interface AuthProps {
  mode?: AuthMode;
  username?: string;
  onAppleAuth: (credential: AppleCredential, username?: string) => void;
  onGoogleAuth: (token: string, username?: string) => void;
}

export function Auth({
  mode = 'signIn',
  username,
  onAppleAuth,
  onGoogleAuth,
}: AuthProps) {
  const [isAvailable, setIsAvailable] = useState(false);
  const {
    getCredential,
    loading: appleLoading,
    error: appleError,
  } = useAppleAuth();
  const {
    signIn: signInWithGoogle,
    loading: googleLoading,
    error: googleError,
  } = useGoogleAuth();

  const isSignUp = mode === 'signUp';
  const appleDisabled = isSignUp && !username;
  const googleDisabled = isSignUp && !username;
  const { t } = useTranslation(mode === 'signUp' ? 'register' : 'login');

  useEffect(() => {
    if (Platform.OS === 'ios') {
      AppleAuthentication.isAvailableAsync().then(setIsAvailable);
    }
  }, []);

  const handleApplePress = async () => {
    if (appleDisabled) return;
    const credential = await getCredential();
    if (credential) {
      onAppleAuth(credential, username);
    }
  };

  const handleGooglePress = async () => {
    if (googleDisabled) return;
    const token = await signInWithGoogle();
    if (token) {
      onGoogleAuth(token, username);
    }
  };

  const renderAppleButton = () => {
    if (Platform.OS === 'ios' && isAvailable) {
      return (
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
            opacity: appleDisabled ? 0.5 : 1,
          }}
          onPress={appleDisabled ? () => {} : handleApplePress}
        />
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

    return null;
  };

  const renderGoogleButton = () => (
    <Pressable
      onPress={googleDisabled ? () => {} : handleGooglePress}
      style={{
        width: '100%',
        flexDirection: 'row',
        gap: 5,
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: googleDisabled ? 0.5 : 1,
      }}
    >
      <AntDesign name='google' size={18} />
      <Text style={{ color: '#000', fontSize: 18, fontWeight: '600' }}>
        {t('googleButton')}
      </Text>
    </Pressable>
  );

  return (
    <View style={{ width: '100%', gap: 12 }}>
      {renderAppleButton()}
      {renderGoogleButton()}
      {appleError && <ThemedText type='error'>{appleError}</ThemedText>}
      {googleError && (
        <ThemedText type='error'>{t(`errors.${googleError}`)}</ThemedText>
      )}
    </View>
  );
}
