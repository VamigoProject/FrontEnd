import { MyProfileLayout } from 'components/layout';
import { useEffect } from 'react';
import { useUserStore, useSystemStore, useOtherReviewStore } from 'stores';
import { mylikeApi } from 'utils/api';
import { ReviewPost, Empty } from 'components';

const like = () => {
  const uid = useUserStore((state) => state.uid);
  const { startLoadingAction, endLoadingAction } = useSystemStore(
    (state) => state,
  );

  const { reviewData, setReviewAction } = useOtherReviewStore((state) => state);

  const fetch = async () => {
    startLoadingAction();
    try {
      const response = await mylikeApi(uid!);
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
      <MyProfileLayout current={2}>
        <Empty />
      </MyProfileLayout>
    );
  }

  return (
    <MyProfileLayout current={2}>
      {reviewData.length === 0 && <Empty />}
      {reviewData.length !== 0 &&
        reviewData.map((review) => (
          <ReviewPost
            key={review.reviewId}
            review={review}
            store={useOtherReviewStore}
          />
        ))}
    </MyProfileLayout>
  );
};

export default like;
