import { USER_STORE } from 'utils/statics';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from 'utils/types';

interface UserStore {
  isLoggedIn: boolean; //로그인 되어있는지 여부
  User: User | null;
  uid: number | null;
  nickname: string | null; //로그인되어 있을 경우 유저의 nickname
  profile: string | null; //base64로 인코딩 된 사용자 프로필 이미지
  introduce: string | null; //자기소개
  accessToken: string | null;
  refreshToken: string | null;
  loginAction: (
    uid: number,
    nickname: string,
    profile: string | null,
    introduce: string | null,
    accessToken: string,
    refreshToken: string,
  ) => void; //로그인 액션
  logoutAction: () => void; //로그아웃 액션
  updateAction: (
    nickname: string,
    profile: string | null,
    introduce: string | null,
  ) => void; //프로필 업데이트 액션

  follower: Array<User>; //나를 팔로우하는 사람
  following: Array<User>; //내가 팔로우하는 사람
  setFollower: (follower: Array<User>) => void;
  setFollowing: (following: Array<User>) => void;
}

const useUserStore = create<UserStore>(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      User: null,
      uid: null,
      nickname: null,
      profile: null,
      introduce: null,
      accessToken: null,
      refreshToken: null,

      loginAction: (
        uid,
        nickname,
        profile,
        introduce,
        accessToken,
        refreshToken,
      ) => {
        set({
          isLoggedIn: true,
          uid,
          nickname,
          profile,
          introduce,
          accessToken,
          refreshToken,
        });
      },
      logoutAction: () => {
        set({
          isLoggedIn: false,
          uid: null,
          nickname: null,
          profile: null,
          introduce: null,
          accessToken: null,
          refreshToken: null,
        });
      },
      updateAction: (nickname, profile, introduce) => {
        set({
          nickname,
          profile,
          introduce,
        });
      },

      follower: [],
      following: [],
      setFollower: (follower) => {
        set({
          follower,
        });
      },
      setFollowing: (following) => {
        set({
          following,
        });
      },
    }),
    {
      name: USER_STORE,
      getStorage: () => localStorage,
    },
  ),
);

export const createUserStore = () => useUserStore();

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
