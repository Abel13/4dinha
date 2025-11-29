import { useMemo, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

const googleConfig = {
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
};

const hasValidConfig = Object.values(googleConfig).some((value) => !!value);

export const useGoogleAuth = () => {
  const [error, setError] = useState<string>();
  const [isPrompting, setIsPrompting] = useState(false);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: googleConfig.iosClientId,
    androidClientId: googleConfig.androidClientId,
    clientId: googleConfig.webClientId,
  });

  const loading = useMemo(
    () => isPrompting || response?.type === 'locked',
    [isPrompting, response?.type],
  );

  const signIn = async () => {
    try {
      setError(undefined);

      if (!hasValidConfig) {
        setError('google_config_missing');
        return null;
      }

      if (!request) {
        setError('google_sign_in_failed');
        return null;
      }

      setIsPrompting(true);
      const result = await promptAsync();

      if (result.type === 'success' && result.params?.id_token) {
        return result.params.id_token as string;
      }

      if (result.type === 'error') {
        setError('google_sign_in_failed');
      }

      return null;
    } catch (err) {
      setError('google_sign_in_failed');
      return null;
    } finally {
      setIsPrompting(false);
    }
  };

  return {
    signIn,
    loading,
    error,
  };
};
