import create from 'zustand';
import { persist } from 'zustand/middleware';
import { COLOR_STORE } from 'utils/statics';

interface ColorStore {
  bodyColor: string;
  sideColor: string;
  headerColor: string;
  setBodyColor: (color: string) => void;
  setSideColor: (color: string) => void;
  setHeaderColor: (color: string) => void;
}

const useColorStore = create<ColorStore>(
  persist(
    (set, get) => ({
      bodyColor: '#F7F0E6',
      sideColor: '#F1F8E9',
      headerColor: '#4CAF50',
      setBodyColor: (color: string) => {
        set({ bodyColor: color });
      },
      setSideColor: (color: string) => {
        set({ sideColor: color });
      },
      setHeaderColor: (color: string) => {
        set({ headerColor: color });
      },
    }),
    {
      name: COLOR_STORE,
      getStorage: () => localStorage,
    },
  ),
);

export default useColorStore;
