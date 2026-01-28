import { useState, useEffect } from 'react';
import {
  GoogleSignin,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';

export const useGoogleAuth = () => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Configure Google Sign-In
    const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
    const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;

    if (__DEV__) {
      console.log('Google Sign-In Configuration:');
      console.log(
        'Web Client ID:',
        webClientId ? `${webClientId.substring(0, 20)}...` : 'NOT SET',
      );
      console.log(
        'iOS Client ID:',
        iosClientId ? `${iosClientId.substring(0, 20)}...` : 'NOT SET',
      );
      console.log('Platform:', Platform.OS);
    }

    if (!webClientId) {
      console.error('EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID is not set!');
      setError('google_config_missing');
      return;
    }

    const config: any = {
      webClientId: webClientId,
      offlineAccess: true,
    };

    // Only add iosClientId if on iOS or if it's provided
    if (Platform.OS === 'ios' && iosClientId) {
      config.iosClientId = iosClientId;
    }

    GoogleSignin.configure(config);
  }, []);

  const signIn = async (): Promise<string | null> => {
    try {
      setError(undefined);
      setLoading(true);

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        // Return the ID token to be used with Supabase
        console.log('Google Sign-In Succeeded');
        return response.data.idToken;
      }

      console.log('Google Sign-In fail');
      return null;
    } catch (err: any) {
      if (__DEV__) {
        console.error('Google Sign-In Error:', err);
      }

      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        // User canceled - don't show error
        return null;
      } else if (err.code === statusCodes.IN_PROGRESS) {
        // Operation in progress - should not happen
        setError('google_sign_in_failed');
        return null;
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError('google_play_services_not_available');
        return null;
      } else if (
        err.code === 'DEVELOPER_ERROR' ||
        err.message?.includes('DEVELOPER_ERROR') ||
        err.code === 10 // Status code 10 is DEVELOPER_ERROR
      ) {
        setError('google_developer_error');
        return null;
      } else {
        setError('google_sign_in_failed');
        return null;
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn,
    loading,
    error,
  };
};
