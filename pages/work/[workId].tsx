import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ContentBox, Empty, ReviewPost } from 'components';
import { workReviewApi } from 'utils/api';
import { useUserStore } from 'stores';

const Image = ({ src }: { src: string | undefined }) => {
  const [imageSrc, setImageSrc] = useState('');
  const onError = () => {
    setImageSrc('/noImage.png');
  };

  useEffect(() => {
    if (src !== undefined) {
      setImageSrc(src);
    }
  }, []);

  return <img src={imageSrc} onError={onError} width="128" />;
};

const WorkWrapper = styled(ContentBox)`
  display: flex;
  flex-direction: row;
`;

const LeftSize = styled.div`
  width: 128px;
`;

const RightSize = styled.div`
  padding: 8px;
`;

const detail = () => {
  const { uid } = useUserStore((state) => state);
  const router = useRouter();
  const { workId } = router.query;

  const [workName, setWorkName] = useState<string>('');
  const [workImage, setWorkImage] = useState<string | undefined>(undefined);
  const [workCategory, setWorkCategory] = useState<string>('');

  const [reviews, setReviews] = useState<Array<Review>>([]);

  const fetch = async () => {
    try {
      if (Array.isArray(workId) || workId === undefined) {
        throw 'Something was wrong';
      } else {
        const response = await workReviewApi(uid!, parseInt(workId));
        console.log(response);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    setWorkName('테스트용');
    setWorkImage(undefined);
  }, [router.isReady, router.query.workId]);

  return (
    <>
      <WorkWrapper padding="4px">
        <LeftSize>
          <Image src={workImage} />
        </LeftSize>

        <RightSize>
          <h3>{workName}</h3>
        </RightSize>
      </WorkWrapper>

      {reviews.length === 0 && <Empty />}
      {reviews.length !== 0 &&
        reviews.map((review: Review) => (
          <ReviewPost key={review.reviewId} review={review} />
        ))}
    </>
  );
};

export default detail;
