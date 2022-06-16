import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ContentBox, Empty, ReviewPost } from 'components';
import { workReviewApi } from 'utils/api';
import { useUserStore } from 'stores';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import AnimationIcon from '@mui/icons-material/Animation';

const Image = ({ src }: { src: string | undefined }) => {
  const [imageSrc, setImageSrc] = useState('');
  const onError = () => {
    setImageSrc('/noImage.png');
  };

  useEffect(() => {
    if (src !== undefined) {
      setImageSrc(src);
    }
  }, [src]);

  return (
    <img
      src={`data:image/png;base64, ${imageSrc}`}
      onError={onError}
      width="128"
    />
  );
};

const NoImage = () => {
  return <img src={'/noImage.png'} width="128"></img>;
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

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
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
        const { workInfo, reviews } = response;
        setWorkName(workInfo.name);
        setWorkCategory(workInfo.category);
        workInfo.image ? setWorkImage(workInfo.image) : setWorkImage(undefined);
        setReviews(reviews);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetch();
  }, [router.isReady, router.query.workId]);

  return (
    <>
      <WorkWrapper padding="4px">
        <LeftSize>
          {workImage ? <Image src={workImage} /> : <NoImage />}
        </LeftSize>

        <RightSize>
          <Title>
            {workCategory === 'book' && <MenuBookIcon />}
            {workCategory === 'movie' && <LocalMoviesIcon />}
            {workCategory === 'drama' && <LiveTvIcon />}
            {workCategory === 'animation' && <AnimationIcon />}
            {workName}
          </Title>
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
