import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { Redirect, Slot, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as ScreenOrientation from 'expo-screen-orientation';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAudioConfig } from '@/hooks/useAudioConfig';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { supabase } from '@/providers/supabase';
import { Session } from '@supabase/supabase-js';
import {
  RiveRenderer,
  RiveRendererAndroid,
  RiveRendererIOS,
} from 'rive-react-native';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const segments = useSegments();

  const [loaded] = useFonts({
    BarlowCondensed: require('../assets/fonts/BarlowCondensed-Regular.ttf'),
    BarlowCondensedSemiBold: require('../assets/fonts/BarlowCondensed-SemiBold.ttf'),
    BarlowCondensedBold: require('../assets/fonts/BarlowCondensed-Bold.ttf'),
  });
  const isAndroid = Platform.OS === 'android';
  useAudioConfig();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    RiveRenderer.defaultRenderer(
      RiveRendererIOS.Rive,
      RiveRendererAndroid.Rive,
    );
    // pega sessão atual e marca que já verificamos
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setAuthChecked(true);
    });

    // escuta mudanças de auth
    const { data: sub } = supabase.auth.onAuthStateChange(
      (_evt, newSession) => {
        setSession(newSession);
      },
    );

    return () => sub.subscription.unsubscribe();
  }, []);

  if (!loaded || !authChecked) {
    return null;
  }

  const inAuthGroup = segments[0] === 'auth';

  if (!session && !inAuthGroup) {
    return <Redirect href='/auth' />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={DarkTheme}>
        <Slot initialRouteName='(tabs)' />
        {isAndroid && <StatusBar hidden style='auto' />}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
