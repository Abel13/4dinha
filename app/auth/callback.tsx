import { useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase } from '@/providers/supabase';
import { Loading } from '@/components/Loading';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';
import { useUserSessionStore } from '@/hooks/useUserSessionStore';

export default function AuthCallback() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { setSession } = useUserSessionStore((state) => state);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Extract code from URL parameters
        const code = params.code as string;

        if (code) {
          // Exchange the code for a session
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);

          if (error) {
            console.error('Error exchanging code for session:', error);
            router.replace('/auth');
            return;
          }

          if (data.session) {
            // Set session in store
            setSession(data.session);

            // Check if user has a username (similar to Apple auth flow)
            if (data.session.user.user_metadata?.username) {
              // User has username, redirect to main app
              router.replace('/(tabs)');
            } else {
              // User needs to set username, redirect to update page
              router.replace('/auth/update');
            }
          } else {
            // No session found, redirect to auth
            router.replace('/auth');
          }
        } else {
          // No code found, redirect to auth
          router.replace('/auth');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        router.replace('/auth');
      }
    };

    handleCallback();
  }, [params.code, router, setSession]);

  return (
    <ThemedView style={styles.container}>
      <Loading />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

