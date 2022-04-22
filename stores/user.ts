import { USER_STORE } from 'utils/statics';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from 'utils/types';

interface UserStore {
  isLoggedIn: boolean; //로그인 되어있는지 여부
  User: User | null;
  nickname: string | null; //로그인되어 있을 경우 유저의 nickname
  profile: string | null; //base64로 인코딩 된 사용자 프로필 이미지
  accessToken: string | null;
  refreshToken: string | null;
  loginAction: (
    nickname: string,
    profile: string | null,
    accessToken: string,
    refreshToken: string,
  ) => void; //로그인 액션
  logoutAction: () => void; //로그아웃 액션
}

const useUserStore = create<UserStore>(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      User: null,
      nickname: null,
      profile: null,
      accessToken: null,
      refreshToken: null,

      loginAction: (nickname, profile, accessToken, refreshToken) => {
        set({
          isLoggedIn: true,
          nickname,
          profile,
          accessToken,
          refreshToken,
        });
      },

      logoutAction: () => {
        set({
          isLoggedIn: false,
          nickname: null,
          profile: null,
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
