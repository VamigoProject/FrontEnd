import { USER_STORE } from 'utils/statics';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  isLoggedIn: boolean; //로그인 되어있는지 여부
  uid: number | null; //user id
  nickname: string | null; //로그인되어 있을 경우 유저의 nickname
  accessToken: string | null;
  refreshToken: string | null;
  loginAction: (
    uid: number,
    nickname: string,
    accessToken: string,
    refreshToken: string,
  ) => void; //로그인 액션
  logoutAction: () => void; //로그아웃 액션
}

const useUserStore = create<User>(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      uid: null,
      nickname: null,
      accessToken: null,
      refreshToken: null,

      loginAction: (uid, nickname, accessToken, refreshToken) => {
        set({
          isLoggedIn: true,
          uid,
          nickname,
          accessToken,
          refreshToken,
        });
      },

      logoutAction: () => {
        set({
          isLoggedIn: false,
          uid: null,
          nickname: null,
          accessToken: null,
          refreshToken: null,
        });
      },
    }),
    {
      name: USER_STORE,
      getStorage: () => localStorage,
    },
  ),
);

interface Auth {
  mail: string | null;
  setMailAction: (mail: string) => void;
}

export const useAuthStore = create<Auth>((set, get) => ({
  mail: null,
  setMailAction: (mail) => {
    set({
      mail,
    });
  },
}));

export default useUserStore;
