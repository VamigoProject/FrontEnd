/* eslint-disable @typescript-eslint/no-unused-vars */
import { TREND_STORE } from 'utils/statics';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';

interface TrendStore {
  trendData: Array<Work>;
  setTrend: (data: Work | undefined, index: number) => void;
  clearTrend: () => void;
}

const useReviewStore = create<TrendStore>(
  persist(
    (set, get) => ({
      trendData: Array(10).fill(null),
      setTrend: (data, index) => {
        set(
          produce((draft) => {
            draft.trendData[index] = data;
          }),
        );
      },
      clearTrend: () => {
        set(() => ({ trendData: Array(10).fill(null) }));
      },
    }),
    {
      name: TREND_STORE,
      getStorage: () => localStorage,
    },
  ),
);

export default useReviewStore;
