import { type Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ISessionStore {
  session: Session | null;
  username?: string;
  profilePicture?: string;
  loadSession: () => void;
  setSession: (session: Session | null) => void;
}

export const useUserSessionStore = create<ISessionStore>()(
  persist(
    (set, get) => ({
      session: null,
      loadSession: async () => {
        const session = get().session as Session;

        const { username } = session.user.user_metadata;

        const profilePicture = session.user.user_metadata.image;

        set({ session, username, profilePicture });
      },
      setSession: (session) => {
        set({ session });
      },
    }),
    {
      name: 'user-session',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
