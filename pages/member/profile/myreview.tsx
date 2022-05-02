import ProfileLayout from 'components/ProfileLayout';
import { useState, useEffect, useRef } from 'react';
import useUserStore from 'stores/user';
import { Review } from 'utils/types';
import { myreviewApi } from 'utils/api';
import ReviewPost from 'components/ReviewPost';
import Empty from 'components/Empty';
import useSystemStore from 'stores/system';

const myreview = () => {
  const uid = useUserStore((state) => state.uid);
  const { startLoadingAction, endLoadingAction } = useSystemStore(
    (state) => state,
  );

  const [reviewData, setReviewData] = useState<Array<Review>>([]);

  const timerId = useRef<any>();
  const [index, setIndex] = useState<number>(0);

  const fetch = async () => {
    try {
      const response = await myreviewApi(uid!);
      setReviewData(response);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    startLoadingAction();
    try {
      fetch();
      timerId.current = setInterval(() => {
        if (index < reviewData.length) {
          setIndex((prev) => prev + 1);
        } else {
          clearInterval(timerId.current);
        }
      }, 250);
    } catch (err) {
      alert(err);
    }
    endLoadingAction();

    return () => {
      clearInterval(timerId.current);
      endLoadingAction();
    };
  }, [reviewData]);

  return (
    <ProfileLayout>
      {reviewData.length === 0 && <Empty />}
      {reviewData.length !== 0 &&
        reviewData
          .slice(0, index)
          .map((review) => (
            <ReviewPost key={review.reviewId} review={review} />
          ))}
    </ProfileLayout>
  );
};

export default myreview;
