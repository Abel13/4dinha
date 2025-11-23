import { Stack } from 'expo-router';

export default function AuthLayout() {
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
      <Stack.Screen name='register' />
      <Stack.Screen name='update' />
      <Stack.Screen name='confirmation' />
    </Stack>
  );
}
