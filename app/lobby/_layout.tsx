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
      <Stack.Screen
        name='[matchId]'
        options={{
          animationDuration: 500,
          animation: 'simple_push',
          title: 'Perfil',
        }}
      />
      <Stack.Screen
        name='new'
        options={{
          animationDuration: 500,
          animation: 'simple_push',
          title: 'Perfil',
        }}
      />
    </Stack>
  );
}
