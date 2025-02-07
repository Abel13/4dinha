import { Ionicons } from '@expo/vector-icons';

export const useHome = () => {
  const footerMenu: { icon: keyof typeof Ionicons.glyphMap; text: string }[] = [
    { icon: 'people-outline', text: 'Amigos' },
    { icon: 'cart-outline', text: 'Loja' },
    { icon: 'shirt-outline', text: 'Itens' },
    { icon: 'ribbon-outline', text: 'Conquistas' },
  ];

  const headerMenu: string[] = [
    'chatbox-ellipses-outline',
    'list-outline',
    'settings-outline',
  ];

  return {
    footerMenu,
    headerMenu,
  };
};
