import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  email: string;
  name: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  accessToken: string;
}

interface Store {
  user: User | undefined;
  setUser: (user: User) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const useStore = create(
  persist<Store>(
    (set) => ({
      user: undefined,
      setUser: (user) => set({ user }),
      isLoggedIn: false,
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    }),
    {
      name: 'store',
    }
  )
);
