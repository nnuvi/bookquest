import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthUser, User } from "@/types/user";

type AuthState = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;

  setUser: (user: User | null) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),

      setLoading: (loading) => set({ loading }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),

      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error("Failed to rehydrate auth store:", error);
          }

          state?.setLoading(false);
        };
      },
    },
  ),
);
