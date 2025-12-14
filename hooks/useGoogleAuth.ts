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

    GoogleSignin.configure({
      // Get your web client ID from Google Cloud Console
      // This is the OAuth 2.0 Client ID (not the iOS/Android client ID)
      webClientId: webClientId,
      // iOS client ID (optional, only needed for iOS)
      iosClientId: iosClientId,
      // Android client ID is automatically configured via google-services.json
      // For Android, you may also need offlineAccess: true
      offlineAccess: true,
    });
  }, []);

  const signIn = async (): Promise<string | null> => {
    try {
      setError(undefined);
      setLoading(true);

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Sign in with Google
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        // Return the ID token to be used with Supabase
        console.log('Google Sign-In Succeeded');
        return response.data.idToken;
      }

      console.log('Google Sign-In fail');
      return null;
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      console.error('Error code:', err.code);
      console.error('Error message:', err.message);

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
        err.message?.includes('DEVELOPER_ERROR')
      ) {
        // Developer configuration error
        console.error('DEVELOPER_ERROR - Check configuration:');
        console.error(
          '1. Verify EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID is set correctly',
        );
        console.error(
          '2. For Android: Add SHA-1 and SHA-256 to Google Cloud Console',
        );
        console.error('3. Verify package name matches: com.abelb13.x4dinha');
        console.error(
          '4. For iOS: Verify iosUrlScheme in app.json matches iOS Client ID',
        );
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
