import { Stack } from 'expo-router';

export default function LobbyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animationMatchesGesture: true,
        navigationBarHidden: true,
        statusBarHidden: true,
      }}
    >
      <Stack.Screen name='[matchId]' />
      <Stack.Screen name='new' />
    </Stack>
  );
}
