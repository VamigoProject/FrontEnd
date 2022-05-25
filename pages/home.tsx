import styled from 'styled-components';
import { Empty } from 'components';
import { Review, User } from 'utils/types';
import { ReviewPost } from 'components';
import { timelineApi } from 'utils/api';
import { useEffect, useRef, useState } from 'react';
import { useReviewStore, useUserStore } from 'stores';
import { GetServerSideProps } from 'next';

const now = new Date();

interface HomeTypes {
  test: any;
  reviews: Array<Review>;
}

const Home = ({ test, reviews }: HomeTypes) => {
  const { uid, nickname, accessToken, refreshToken } = useUserStore(
    (state) => state,
  );
  const { reviewData, setReviewAction } = useReviewStore((state) => state);

  // useEffect(() => {
  //   setReviewAction(reviews);
  // });

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

// export async function getServerSideProps() {
//   const test = useUserStore.getState().nickname;
//   const reviews = await timelineApi(1);

//   return { props: { test: test, reviews: reviews } };
// }

export default Home;
