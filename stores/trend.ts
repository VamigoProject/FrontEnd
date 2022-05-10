import { TREND_STORE } from 'utils/statics';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Work } from 'utils/types';

interface TrendStore {
  trendData: Array<Work>;
  setTrend: (workData: Array<Work>) => void;
}

const dummy: Array<Work> = [
  { id: 1, name: '작품1번', category: 'book' },
  {
    id: 4,
    name: '긴 작품의 경우 어떻게 표시가 될 지 알아볼까요',
    category: 'movie',
  },
  { id: 3, name: '작품3번', category: 'animation' },
  { id: 2, name: '작품2번', category: 'animation' },
  { id: 5, name: '작품5번', category: 'drama' },
];

const useReviewStore = create<TrendStore>(
  persist(
    (set, get) => ({
      trendData: [],
      setTrend: (data: Array<Work>) => {
        set(() => ({
          trendData: dummy,
        }));
      },
    }),
    {
      name: TREND_STORE,
      getStorage: () => localStorage,
    },
  ),
);

export default useReviewStore;
