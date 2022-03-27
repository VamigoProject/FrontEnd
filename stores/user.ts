import create from 'zustand';
import { ACCESS_TOKEN, NICKNAME, REFRESH_TOKEN } from '../utils/statics';

interface User {
  isLoggedIn: boolean; //로그인 되어있는지 여부
  loginAction: (
    nickname: string,
    accessToken: string,
    refreshToken: string,
  ) => void; //로그인 액션
  logoutAction: () => void; //로그아웃 액션
  nickname: string; //로그인되어 있을 경우 유저의 nickname
}

const useUserStore = create<User>((set) => ({
  isLoggedIn: false,
  loginAction: (nickname, accessToken, refreshToken) => {
    localStorage.setItem(NICKNAME, nickname);
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    set(() => ({ isLoggedIn: true, nickname: nickname }));
  },
  logoutAction: () => {
    localStorage.removeItem(NICKNAME);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    set(() => ({ isLoggedIn: false, nickname: '' }));
  },
  nickname: '',
}));

export default useUserStore;
