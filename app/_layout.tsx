import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as ScreenOrientation from 'expo-screen-orientation';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAudioConfig } from '@/hooks/useAudioConfig';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    BarlowCondensed: require('../assets/fonts/BarlowCondensed-Regular.ttf'),
    BarlowCondensedSemiBold: require('../assets/fonts/BarlowCondensed-SemiBold.ttf'),
    BarlowCondensedBold: require('../assets/fonts/BarlowCondensed-Bold.ttf'),
  });
  useAudioConfig();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={DarkTheme}>
        <Slot />
        <StatusBar style='dark' hidden />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
