import { Redirect, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { useUserSessionStore } from '@/hooks/useUserSessionStore';

export default function TabLayout() {
  const { session, loadSession } = useUserSessionStore((state) => state);

  useEffect(() => {
    loadSession();
  }, []);

  if (!session) {
    return <Redirect href="/auth" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animationMatchesGesture: true,
        navigationBarHidden: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Encontrar Partida',
        }}
      />
      <Stack.Screen
        name="explore"
        options={{
          title: 'Histórico',
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          animationDuration: 1500,
          animation: 'simple_push',
          title: 'Perfil',
        }}
      />
    </Stack>
  );
}
