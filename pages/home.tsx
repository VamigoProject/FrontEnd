import { Empty } from 'components';
import { ReviewPost } from 'components';
import { timelineApi } from 'utils/api';
import { useEffect } from 'react';
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
