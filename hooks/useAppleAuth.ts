import { useState } from 'react';
import { Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useTranslation } from './useTranslation';

export interface AppleCredential {
  identityToken: string;
  email?: string | null;
  fullName?: {
    givenName?: string | null;
    familyName?: string | null;
    middleName?: string | null;
    nickname?: string | null;
  } | null;
}

export const useAppleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { t } = useTranslation('register');

  const getCredential = async (): Promise<AppleCredential | null> => {
    if (Platform.OS !== 'ios') {
      setError(t('Apple Authentication is only available on iOS'));
      return null;
    }

    try {
      setLoading(true);
      setError(undefined);

      const isAvailable = await AppleAuthentication.isAvailableAsync();
      if (!isAvailable) {
        setError('Apple Sign In is not available on this device');
        return null;
      }

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken) {
        throw new Error('No identityToken received from Apple');
      }

      return {
        identityToken: credential.identityToken,
        email: credential.email,
        fullName: credential.fullName,
      };
    } catch (e: any) {
      if (e.code === 'ERR_REQUEST_CANCELED') {
        // User canceled - don't show error
        return null;
      }
      setError(e.message || 'Authentication failed');
      console.error('Apple Auth Error:', e);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getCredential, loading, error };
};
