import { Ionicons } from '@expo/vector-icons';

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  name: string;
}

export const useHome = () => {
  const footerMenu: MenuItem[] = [
    { icon: 'people-outline', name: 'Amigos' },
    { icon: 'cart-outline', name: 'Loja' },
    { icon: 'shirt-outline', name: 'Itens' },
    { icon: 'ribbon-outline', name: 'Conquistas' },
  ];

  const headerMenu: MenuItem[] = [
    { icon: 'chatbox-ellipses-outline', name: 'chat' },
    { icon: 'list-outline', name: 'history' },
    { icon: 'settings-outline', name: 'settings' },
  ];

  return {
    footerMenu,
    headerMenu,
  };
};
