import { type Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/providers/supabase';
import { useDiceBear } from './useDiceBear';

interface ISessionStore {
  session: Session | null;
  username?: string;
  profilePicture?: string;
  loadSession: () => void;
  setSession: (session: Session | null) => void;
}

export const useUserSessionStore = create<ISessionStore>()(
  persist(
    (set) => ({
      session: null,
      loadSession: async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const username = session?.user.email?.substring(
          0,
          session?.user.email.indexOf('@'),
        );

        const profilePicture = useDiceBear()({
          version: 7,
          avatar: 'bottts-neutral',
          seed: session?.user.email,
        });
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
