import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        login: (user) => set({ user, isAuthenticated: true }),
        logout: () => {
          localStorage.removeItem("token");
          set({ user: null, isAuthenticated: false });
        },
        updateUser: (updatedFields) =>
          set((state) => ({
            user: state.user ? { ...state.user, ...updatedFields } : null,
          })),
      }),
      {
        name: "user-storage", // local storage key
      }
    )
  )
);

// Subscribe to store changes and log updates to console
useUserStore.subscribe((state) => {
  console.log("User Store Updated", state);
});
