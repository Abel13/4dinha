import { Ionicons } from '@expo/vector-icons';

interface Routes {
  settings: '(tabs)/settings';
  profile: '(tabs)/profile';
  chat: '(tabs)/chat';
  leaderboard: '(tabs)/leaderboard';
}

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  name: string;
  route: keyof Routes;
}

export const useHome = () => {
  const footerMenu: MenuItem[] = [
    { icon: 'people-outline', name: 'Amigos', route: 'settings' },
    { icon: 'cart-outline', name: 'Loja', route: 'settings' },
    { icon: 'shirt-outline', name: 'Itens', route: 'settings' },
    { icon: 'ribbon-outline', name: 'Conquistas', route: 'settings' },
  ];

  const headerMenu: MenuItem[] = [
    { icon: 'chatbox-ellipses-outline', name: 'chat', route: 'chat' },
    { icon: 'trophy-outline', name: 'history', route: 'leaderboard' },
    { icon: 'settings-outline', name: 'settings', route: 'settings' },
  ];

  return {
    footerMenu,
    headerMenu,
  };
};
