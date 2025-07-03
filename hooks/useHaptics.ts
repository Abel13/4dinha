import * as Haptics from 'expo-haptics';

export const useHaptics = () => {
  const impact = (style: Haptics.ImpactFeedbackStyle) =>
    Haptics.impactAsync(style);
  const notification = (type: Haptics.NotificationFeedbackType) =>
    Haptics.notificationAsync(type);
  const selection = () => Haptics.selectionAsync();

  return {
    impact,
    notification,
    selection,
  };
};
