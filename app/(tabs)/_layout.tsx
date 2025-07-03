import { Redirect, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { useUserSessionStore } from '@/hooks/useUserSessionStore';

export default function TabLayout() {
  const { session, loadSession } = useUserSessionStore((state) => state);

  useEffect(() => {
    loadSession();
  }, []);

  if (!session) {
    return <Redirect href='/auth' />;
  }

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
        name='index'
        options={{
          title: 'Encontrar Partida',
        }}
      />
      <Stack.Screen
        name='profile'
        options={{
          animationDuration: 1500,
          animation: 'simple_push',
          title: 'Perfil',
        }}
      />
      <Stack.Screen
        name='settings'
        options={{
          animationDuration: 700,
          animation: 'slide_from_bottom',
          presentation: 'transparentModal',
          title: 'Configurações',
        }}
      />
      <Stack.Screen
        name='chat'
        options={{
          animationDuration: 700,
          animation: 'slide_from_bottom',
          presentation: 'transparentModal',
          title: 'Configurações',
        }}
      />
      <Stack.Screen
        name='leaderboard'
        options={{
          animationDuration: 700,
          animation: 'slide_from_bottom',
          presentation: 'transparentModal',
          title: 'Configurações',
        }}
      />
    </Stack>
  );
}
