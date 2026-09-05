const hasLocalStorage = (): boolean => {
  try {
    return typeof window !== 'undefined' && !!window.localStorage;
  } catch {
    return false;
  }
};

export const storageAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    return hasLocalStorage() ? window.localStorage.getItem(key) : null;
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (hasLocalStorage()) window.localStorage.setItem(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    if (hasLocalStorage()) window.localStorage.removeItem(key);
  },
};
