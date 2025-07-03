import { Stack } from 'expo-router';

export default function GameLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animationMatchesGesture: true,
        navigationBarHidden: true,
        statusBarHidden: true,
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='end' />
      <Stack.Screen name='indiozinho' />
    </Stack>
  );
}
