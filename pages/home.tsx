import styled from 'styled-components';
import { Empty } from 'components';
import { Review, User } from 'utils/types';
import { ReviewPost } from 'components';
import { timelineApi } from 'utils/api';
import { useEffect, useRef, useState } from 'react';
import { useReviewStore, useUserStore } from 'stores';

const now = new Date();

const Home = () => {
  const { uid, nickname, accessToken, refreshToken } = useUserStore(
    (state) => state,
  );
  const { reviewData, setReviewAction } = useReviewStore((state) => state);

  // const [reviewData, setReviewData] = useState<Array<Review>>([]);

  const fetch = async () => {
    try {
      const response = await timelineApi(uid!);
      setReviewAction(response);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      {reviewData.length === 0 && <Empty></Empty>}
      {reviewData.length !== 0 &&
        reviewData.map((review: Review) => (
          <ReviewPost key={review.reviewId} review={review} />
        ))}
    </>
  );
};

export default Home;
