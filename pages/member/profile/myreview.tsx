import ProfileLayout from 'components/ProfileLayout';
import { useState, useEffect } from 'react';
import useUserStore from 'stores/user';
import { myreviewApi } from 'utils/api';
import ReviewPost from 'components/ReviewPost';
import Empty from 'components/Empty';
import useSystemStore from 'stores/system';
import useReviewStore from 'stores/review';

const myreview = () => {
  const uid = useUserStore((state) => state.uid);
  const { startLoadingAction, endLoadingAction } = useSystemStore(
    (state) => state,
  );

  const { reviewData, setReviewAction } = useReviewStore((state) => state);

  const fetch = async () => {
    startLoadingAction();
    try {
      const response = await myreviewApi(uid!);
      setReviewAction(response.reverse());
    } catch (err) {
      alert(err);
    }
    endLoadingAction();
  };

  useEffect(() => {
    try {
      fetch();
    } catch (err) {
      alert(err);
    }
  }, []);

  if (!reviewData) {
    return (
      <ProfileLayout>
        <Empty />
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout>
      {reviewData.length === 0 && <Empty />}
      {reviewData.length !== 0 &&
        reviewData.map((review) => (
          <ReviewPost key={review.reviewId} review={review} />
        ))}
    </ProfileLayout>
  );
};

export default myreview;
