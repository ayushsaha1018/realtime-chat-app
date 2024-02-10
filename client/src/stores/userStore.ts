import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "../utils/types";

interface UserState {
  user: IUser;
  isLoggedIn: boolean;
  setUser: (user: IUser | undefined) => void;
  setAvatar: (img: string) => void;
  setLogIn: (val: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        _id: "",
        __v: 0,
        username: "",
        email: "",
        isAvatarImageSet: false,
        avatarImage: "",
      },
      isLoggedIn: false,
      setUser: (currentUser) => set(() => ({ user: currentUser })),
      setLogIn: (val) => set(() => ({ isLoggedIn: val })),
      setAvatar: (img) =>
        set((state) => ({
          user: { ...state.user, isAvatarImageSet: true, avatarImage: img },
        })),
    }),
    { name: "user" }
  )
);
