import { Platform, Text, View } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useState, useEffect } from 'react';
import { AppleCredential, useAppleAuth } from '@/hooks/useAppleAuth';
import { ThemedText } from '@/components/ThemedText';
import { useTranslation } from '@/hooks/useTranslation';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

type AuthMode = 'signIn' | 'signUp';

interface AuthProps {
  mode?: AuthMode;
  username?: string;
  onAppleAuth: (credential: AppleCredential, username?: string) => void;
  onGoogleAuth: (idToken: string, username?: string) => void;
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
    const idToken = await signInWithGoogle();
    if (idToken) {
      // Pass the ID token to the parent component
      // The parent will use it with Supabase signInWithIdToken
      onGoogleAuth(idToken, username);
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

  const renderGoogleButton = () => {
    if (googleDisabled) {
      return (
        <View style={{ opacity: 0.5 }}>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={() => {}}
            disabled={true}
            style={{ width: '100%', height: 50 }}
          />
        </View>
      );
    }

    return (
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={handleGooglePress}
        disabled={googleLoading}
        style={{ width: '100%', height: 50 }}
      />
    );
  };

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
