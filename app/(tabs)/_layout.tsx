import { Redirect, Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useUserSessionStore } from '@/hooks/useUserSessionStore';
import { useGame } from '@/hooks/useGame';

export default function TabLayout() {
  const { session, loadSession } = useUserSessionStore((state) => state);
  const { gameId } = useGame(session?.user);

  useEffect(() => {
    loadSession();
  }, []);

  if (!session) {
    return <Redirect href='/auth' />;
  }

  if (gameId) {
    return <Redirect href='/(game)/4dinha/table' />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name={focused ? 'person.fill' : 'person'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name={focused ? 'timer.circle.fill' : 'timer.circle'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='matches'
        options={{
          title: 'Encontrar Partida',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name={focused ? 'gamecontroller.fill' : 'gamecontroller'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
