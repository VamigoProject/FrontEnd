import create from 'zustand';

interface SystemStore {
  themeMode: string; //"light" 라이트모드 <-> "dark" 다크모드
  switchTheme: () => void; //라이트모드, 다크모드 스위칭
}

const useSystemStore = create<SystemStore>((set) => ({
  themeMode: 'light',
  switchTheme: () =>
    set((state) => ({
      themeMode: state.themeMode === 'light' ? 'dark' : 'light',
    })),
}));

export default useSystemStore;
