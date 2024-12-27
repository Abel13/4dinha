import { supabase } from '@/providers/supabase';
import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ISessionStore {
  session?: Session;
  loadSession: () => void;
  setSession: (session?: Session) => void;
}

export const useUserSessionStore = create<ISessionStore>()(
  persist(
    (set) => ({
      loadSession: async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) set(() => ({ session }));
      },
      setSession: async (session) => {
        set(() => ({ session }));
      },
    }),
    {
      name: 'user-session',
    },
  ),
);
