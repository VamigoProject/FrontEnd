import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ContentBox, Empty, ReviewPost } from 'components';
import { workReviewApi } from 'utils/api';
import { useUserStore, useOtherReviewStore, useSystemStore } from 'stores';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import AnimationIcon from '@mui/icons-material/Animation';
import { Rating } from '@mui/material';

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

const LeftSide = styled.div`
  width: 128px;
`;

const RightSide = styled.div`
  padding: 8px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
`;

const detail = () => {
  const { startLoadingAction, endLoadingAction } = useSystemStore(
    (state) => state,
  );
  const { uid } = useUserStore((state) => state);
  const router = useRouter();
  const { workId } = router.query;

  const [workName, setWorkName] = useState<string>('');
  const [workImage, setWorkImage] = useState<string | undefined>(undefined);
  const [workCategory, setWorkCategory] = useState<string>('');
  const [workRating, setWorkRating] = useState<number>(0);

  const { reviewData, setReviewAction } = useOtherReviewStore((state) => state);

  const fetch = async () => {
    try {
      if (Array.isArray(workId) || workId === undefined) {
        throw 'Something was wrong';
      } else {
        startLoadingAction();
        const response = await workReviewApi(uid!, parseInt(workId));
        const { workInfo, reviews } = response;
        setWorkName(workInfo.name);
        setWorkCategory(workInfo.category);
        workInfo.image ? setWorkImage(workInfo.image) : setWorkImage(undefined);
        setWorkRating(workInfo.rating);
        setReviewAction(reviews);
      }
    } catch (error) {
      alert(error);
    }
    endLoadingAction();
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetch();
  }, [router.isReady, router.query.workId]);

  return (
    <>
      <WorkWrapper padding="4px">
        <LeftSide>
          {workImage ? <Image src={workImage} /> : <NoImage />}
        </LeftSide>

        <RightSide>
          <Title>
            {workCategory === 'book' && <MenuBookIcon />}
            {workCategory === 'movie' && <LocalMoviesIcon />}
            {workCategory === 'drama' && <LiveTvIcon />}
            {workCategory === 'animation' && <AnimationIcon />}
            {workName}
          </Title>
          <Rating name="rating" value={workRating} readOnly precision={0.5} />
        </RightSide>
      </WorkWrapper>

      {reviewData.length === 0 && <Empty />}
      {reviewData.length !== 0 &&
        reviewData.map((review: Review) => (
          <ReviewPost
            key={review.reviewId}
            review={review}
            store={useOtherReviewStore}
          />
        ))}
    </>
  );
};

export default detail;
