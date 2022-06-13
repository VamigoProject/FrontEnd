import { Empty } from 'components';
import { Review } from 'utils/types';
import { ReviewPost } from 'components';
import { timelineApi } from 'utils/api';
import { useLayoutEffect } from 'react';
import { useReviewStore, useUserStore } from 'stores';

const Home = () => {
  const { uid } = useUserStore((state) => state);
  const { reviewData, setReviewAction } = useReviewStore((state) => state);

  const fetch = async () => {
    try {
      const response = await timelineApi(uid!);
      setReviewAction(response);
    } catch (error) {
      alert(error);
    }
  };

  useLayoutEffect(() => {
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
