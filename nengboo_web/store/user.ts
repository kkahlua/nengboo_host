import { create } from "zustand";

interface User {
  user_id: string;
  user_email: string;
  user_name: string;
  user_create_day: string;
}

interface UserState {
  user: User | null;
  updateUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  updateUser: (user) => set(() => ({ user })),
}));
