import useUserStore from 'stores/user';
import styled from 'styled-components';
import Empty from 'components/Empty';
import { Review, User } from 'utils/types';
import ReviewPost from 'components/ReviewPost';
import { useEffect, useRef, useState } from 'react';

import { kleeImage, testImage } from 'utils/statics';

const user1: User = { uid: 1, nickname: 'Parkjun', profile: null };
const user2: User = { uid: 2, nickname: 'DongHo Ryu', profile: null };
const user3: User = { uid: 3, nickname: 'GyeungHwan Lee', profile: testImage };
const user4: User = { uid: 4, nickname: 'UCheol Lee', profile: null };

const now = new Date();

const ReviewData: Array<Review> = [
  {
    reviewId: 1,
    uid: 1,
    nickname: 'Parkjun',
    profile: null,
    time: now,
    workName: '인터스텔라',
    workCategory: 'movie',
    comment:
      '인터스텔라는 ㄹㅇ 신이다. 내가 알던 그 영화가 맞냐? 가슴이 웅장해진다',
    rating: 5,
    image: [kleeImage, testImage],
    reply: [
      { replyId: 1, time: now, user: user2, comment: '인정합니다' },
      { replyId: 2, time: now, user: user3, comment: '솔직히 노인정' },
    ],
    likes: 34500,
    isLiked: true,
    spoiler: false,
  },
  {
    reviewId: 2,
    uid: 2,
    nickname: 'Dongho Yu',
    profile: null,
    time: new Date(2022, 4, 24, 10, 40, 0),
    workName: '해리포터: 불의 잔',
    workCategory: 'book',
    comment:
      '마법사의 돌이 훨씬 재밌음 불의 잔 이거는 왜 만든거임? 그래도 3점은 준다, 이거 볼 바에 마법사의 돌 ~ 아즈카반의 죄수 다시 정주행 하는게 훨씬 나을듯?',
    rating: 3,
    image: [],
    reply: [
      {
        replyId: 1,
        time: new Date(2022, 4, 25, 10, 40, 0),
        user: user4,
        comment: '이건 좀, 개띵작인데 책알못 ㅉㅉ',
      },
    ],
    likes: 9800,
    isLiked: false,
    spoiler: true,
  },
  {
    reviewId: 3,
    time: new Date(2022, 4, 23, 10, 40, 0),
    uid: 4,
    nickname: 'Ucheol Lee',
    profile: testImage,
    workName: '해리포터: 마법사의 돌',
    workCategory: 'animation',
    comment: '마법사의 돌은 ㅇㅈ이지',
    rating: 4,
    image: [],
    reply: [],
    likes: 50,
    isLiked: false,
    spoiler: false,
  },
];

const Home = () => {
  const { nickname, accessToken, refreshToken } = useUserStore(
    (state) => state,
  );

  const timerId = useRef<any>();
  const [index, setIndex] = useState<number>(0);

  // useEffect(() => {
  //   timerId.current = setInterval(() => {
  //     if (index < ReviewData.length) {
  //       setIndex((prev) => prev + 1);
  //     } else {
  //       clearInterval(timerId.current);
  //     }
  //   }, 250);
  //   return () => clearInterval(timerId.current);
  // }, [ReviewData]);

  return (
    <>
      {ReviewData.length === 0 && <Empty></Empty>}
      {ReviewData.length !== 0 &&
        ReviewData.map((review) => (
          <ReviewPost key={review.reviewId} review={review} />
        ))}
    </>
  );
};

export default Home;
