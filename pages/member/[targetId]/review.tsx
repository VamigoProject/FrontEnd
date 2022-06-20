import { ProfileLayout, ReviewPost, Empty } from 'components';
import { useUserStore, useOtherReviewStore } from 'stores';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { memberReviewApi } from 'utils/api';

const review = () => {
  const router = useRouter();

  const { uid } = useUserStore((state) => state);
  const [targetId, setTargetId] = useState<number>(0);
  const [nickname, setNickname] = useState<string>('');
  const [profile, setProfile] = useState<string | null>('');
  const [introduce, setIntroduce] = useState<string>('');
  const [isFollower, setIsFollower] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const { reviewData, setReviewAction } = useOtherReviewStore((state) => state);

  const fetch = async (targetId: number) => {
    try {
      const { user, reviews } = await memberReviewApi(uid!, targetId);
      console.log(reviews);
      setNickname(user.nickname);
      setProfile(user.profile);
      setIntroduce(user.introduce);
      setIsFollower(user.isFollower);
      setIsFollowing(user.isFollowing);
      setTargetId(targetId);

      setReviewAction(reviews);
    } catch (error) {
      alert(error);
      router.replace('/home');
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (typeof router.query.targetId === 'string') {
      if (uid === parseInt(router.query.targetId)) {
        router.replace(`/member/profile`);
      } else {
        fetch(parseInt(router.query.targetId));
      }
    }
  }, [router.isReady, router.query.targetId]);

  return (
    <ProfileLayout
      targetId={targetId}
      nickname={nickname}
      profile={profile}
      introduce={introduce}
      isFollower={isFollower}
      isFollowing={isFollowing}
      setIsFollowing={setIsFollowing}
      current={1}
    >
      {!reviewData && <Empty />}
      {reviewData && reviewData.length === 0 && <Empty />}
      {reviewData &&
        reviewData.length !== 0 &&
        reviewData.map((review) => (
          <ReviewPost
            key={review.reviewId}
            review={review}
            store={useOtherReviewStore}
          />
        ))}
    </ProfileLayout>
  );
};

export default review;
