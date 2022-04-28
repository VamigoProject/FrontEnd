import useUserStore from 'stores/user';
import styled from 'styled-components';
import Empty from 'components/Empty';
import { Review, User } from 'utils/types';
import ReviewPost from 'components/ReviewPost';
import { testImage } from 'utils/statics';

const user1: User = { nickname: 'Parkjun', profile: null };
const user2: User = { nickname: 'DongHo Ryu', profile: null };
const user3: User = { nickname: 'KyungHwan Lee', profile: testImage };
const user4: User = { nickname: 'UCheol Lee', profile: null };

const now = new Date();

const Reviews: Array<Review> = [
  {
    time: now,
    User: user1,
    workName: '인터스텔라',
    workCategory: 'movie',
    comment:
      '시기 다른 래퍼들의 반대편을 바라보던 백프로 개뻥 아님 백프로. 갑오징어를 키우냐? 갑오징어는 먹어야 제 맛이지',
    rate: 5,
    Reply: [{ time: now, User: user2, comment: '인정합니다' }],
    like: 34500,
    isLiked: true,
  },
  {
    time: new Date(2022, 4, 24, 10, 40, 0),
    User: user3,
    workName: '해리포터: 불의 잔',
    workCategory: 'book',
    comment: 'Im on the Next Level',
    rate: 3,
    Reply: [
      {
        time: new Date(2022, 4, 25, 10, 40, 0),
        User: user4,
        comment: '이건 좀',
      },
    ],
    like: 9800,
    isLiked: false,
  },
];

const Home = () => {
  const { nickname, accessToken, refreshToken } = useUserStore(
    (state) => state,
  );

  return (
    <>
      {Reviews.length === 0 && <Empty></Empty>}
      {Reviews.length !== 0 &&
        Reviews.map((review) => (
          <ReviewPost
            key={review.time + review.User.nickname}
            review={review}
          />
        ))}
    </>
  );
};

export default Home;
