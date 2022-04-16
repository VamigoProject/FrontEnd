import create from 'zustand';

interface SystemStore {
  themeMode: string; //"light" 라이트모드 <-> "dark" 다크모드
  switchTheme: () => void; //라이트모드, 다크모드 스위칭
  isLoading: boolean; //True일 경우 로딩 중
  startLoadingAction: () => void;
  endLoadingAction: () => void;
}

const useSystemStore = create<SystemStore>((set) => ({
  muiTheme: 'light',
  themeMode: 'light',
  switchTheme: () =>
    set((state) => ({
      themeMode: state.themeMode === 'light' ? 'dark' : 'light',
    })),
  isLoading: false,
  startLoadingAction: () => {
    set(() => ({
      isLoading: true,
    }));
  },
  endLoadingAction: () => {
    set(() => ({
      isLoading: false,
    }));
  },
}));

export default useSystemStore;
