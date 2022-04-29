import useUserStore from 'stores/user';
import styled from 'styled-components';
import Empty from 'components/Empty';
import { Review, User } from 'utils/types';
import ReviewPost from 'components/ReviewPost';
import { testImage } from 'utils/statics';
import { useEffect, useRef, useState } from 'react';

const user1: User = { nickname: 'Parkjun', profile: null };
const user2: User = { nickname: 'DongHo Ryu', profile: null };
const user3: User = { nickname: 'KyungHwan Lee', profile: testImage };
const user4: User = { nickname: 'UCheol Lee', profile: null };

const now = new Date();

const ReviewData: Array<Review> = [
  {
    reviewId: 1,
    time: now,
    User: user1,
    workName: '인터스텔라',
    workCategory: 'movie',
    comment:
      '인터스텔라는 ㄹㅇ 신이다. 내가 알던 그 영화가 맞냐? 가슴이 웅장해진다',
    rate: 5,
    Reply: [
      { replyId: 1, time: now, User: user2, comment: '인정합니다' },
      { replyId: 2, time: now, User: user3, comment: '솔직히 노인정' },
    ],
    like: 34500,
    isLiked: true,
  },
  {
    reviewId: 2,
    time: new Date(2022, 4, 24, 10, 40, 0),
    User: user3,
    workName: '해리포터: 불의 잔',
    workCategory: 'book',
    comment:
      '마법사의 돌이 훨씬 재밌음 불의 잔 이거는 왜 만든거임? 그래도 3점은 준다, 이거 볼 바에 마법사의 돌 ~ 아즈카반의 죄수 다시 정주행 하는게 훨씬 나을듯?',
    rate: 3,
    Reply: [
      {
        replyId: 1,
        time: new Date(2022, 4, 25, 10, 40, 0),
        User: user4,
        comment: '이건 좀, 개띵작인데 책알못 ㅉㅉ',
      },
    ],
    like: 9800,
    isLiked: false,
  },
  {
    reviewId: 3,
    time: new Date(2022, 4, 23, 10, 40, 0),
    User: user4,
    workName: '해리포터: 마법사의 돌',
    workCategory: 'animation',
    comment: '마법사의 돌은 ㅇㅈ이지',
    rate: 4,
    Reply: [
      {
        replyId: 1,
        time: new Date(2022, 4, 25, 20, 40, 0),
        User: user1,
        comment: '그렇긴 해',
      },
    ],
    like: 50,
    isLiked: false,
  },
];

const Home = () => {
  const { nickname, accessToken, refreshToken } = useUserStore(
    (state) => state,
  );

  const timerId = useRef<any>();
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    timerId.current = setInterval(() => {
      if (index < ReviewData.length) {
        setIndex((prev) => prev + 1);
      } else {
        clearInterval(timerId.current);
      }
    }, 250);
    return () => clearInterval(timerId.current);
  }, [ReviewData]);

  return (
    <>
      {ReviewData.length === 0 && <Empty></Empty>}
      {ReviewData.length !== 0 &&
        ReviewData.slice(0, index).map((review) => (
          <ReviewPost
            key={review.time + review.User.nickname}
            review={review}
          />
        ))}
    </>
  );
};

export default Home;
