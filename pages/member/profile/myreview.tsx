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

  // const [isLoadingDone, setIsLoadingDone] = useState<boolean>(false);
  // const [index, setIndex] = useState<number>(0);

  // const timerId = useRef<any>();

  const fetch = async () => {
    try {
      const response = await myreviewApi(uid!);
      setReviewData(response.reverse());
      // setIsLoadingDone(true);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    startLoadingAction();
    try {
      fetch();
    } catch (err) {
      alert(err);
    }
    endLoadingAction();
  }, []);

  // useEffect(() => {
  //   if (reviewData.length !== 0 || timerId.current !== null) {
  //     timerId.current = setInterval(() => {
  //       if (index < reviewData.length) {
  //         setIndex(index + 1);
  //       } else {
  //         console.log('cleared');
  //         clearInterval(timerId.current);
  //       }
  //     }, 250);
  //   }

  //   return () => {
  //     clearInterval(timerId.current);
  //     endLoadingAction();
  //   };
  // }, [isLoadingDone]);

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
