import { ACCESS_TOKEN, REFRESH_TOKEN, USER_STORE } from 'utils/statics';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  isLoggedIn: boolean; //로그인 되어있는지 여부
  nickname: string | null; //로그인되어 있을 경우 유저의 nickname
  loginAction: (
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
      nickname: null,
      loginAction: (nickname, accessToken, refreshToken) => {
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
        set({
          isLoggedIn: true,
          nickname,
        });
      },
      logoutAction: () => {
        set({
          isLoggedIn: false,
          nickname: null,
        });
      },
    }),
    {
      name: USER_STORE,
      getStorage: () => localStorage,
    },
  ),
);

export default useUserStore;
