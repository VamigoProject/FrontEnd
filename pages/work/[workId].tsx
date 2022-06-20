/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
  justify-content: flex-start;
  align-items: center;
  font-size: 1.25rem;
`;

const Selected = styled.h3`
  display: inline-block;
  color: #4caf50;
  margin-left: 1rem;
  margin-right: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const UnSelected = styled.h3`
  display: inline-block;
  color: black;
  margin-left: 1rem;
  margin-right: 1rem;
  &:hover {
    cursor: pointer;
  }
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

  const [dateDown, setDateDown] = useState<boolean>(true);
  const [dateUp, setDateUp] = useState<boolean>(false);
  const [ratingDown, setRatingDown] = useState<boolean>(false);
  const [ratingUp, setRatingUp] = useState<boolean>(false);

  const { reviewData, setReviewAction, sortReviewAction } = useOtherReviewStore(
    (state) => state,
  );

  const sortByDateUp = (a: Review, b: Review) => {
    if (a.time > b.time) return 1;
    if (a.time < b.time) return -1;
    return 0;
  };
  const sortByDateDown = (a: Review, b: Review) => {
    if (a.time < b.time) return 1;
    if (a.time > b.time) return -1;
    return 0;
  };
  const sortByRatingUp = (a: Review, b: Review) => {
    if (a.rating < b.rating) return 1;
    if (a.rating > b.rating) return -1;
    return 0;
  };
  const sortByRatingDown = (a: Review, b: Review) => {
    if (a.rating > b.rating) return 1;
    if (a.rating < b.rating) return -1;
    return 0;
  };

  const onClickSort = (
    method: 'dateDown' | 'dateUp' | 'ratingDown' | 'ratingUp',
  ) => {
    if (method === 'dateDown') {
      setDateDown(true);
      setDateUp(false);
      setRatingDown(false);
      setRatingUp(false);
      sortReviewAction(sortByDateDown);
    }
    if (method === 'dateUp') {
      setDateDown(false);
      setDateUp(true);
      setRatingDown(false);
      setRatingUp(false);
      sortReviewAction(sortByDateUp);
    }
    if (method === 'ratingDown') {
      setDateDown(false);
      setDateUp(false);
      setRatingDown(true);
      setRatingUp(false);
      sortReviewAction(sortByRatingUp);
    }
    if (method === 'ratingUp') {
      setDateDown(false);
      setDateUp(false);
      setRatingDown(false);
      setRatingUp(true);
      sortReviewAction(sortByRatingDown);
    }
  };

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

      <ContentBox padding="0.25rem">
        {!dateDown && !dateUp && (
          <UnSelected onClick={() => onClickSort('dateDown')}>
            시간순▼
          </UnSelected>
        )}
        {dateDown && (
          <Selected onClick={() => onClickSort('dateUp')}>시간순▼</Selected>
        )}
        {dateUp && (
          <Selected onClick={() => onClickSort('dateDown')}>시간순▲</Selected>
        )}
        {!ratingDown && !ratingUp && (
          <UnSelected onClick={() => onClickSort('ratingDown')}>
            별점순▼
          </UnSelected>
        )}
        {ratingDown && (
          <Selected onClick={() => onClickSort('ratingUp')}>별점순▼</Selected>
        )}
        {ratingUp && (
          <Selected onClick={() => onClickSort('ratingDown')}>별점순▲</Selected>
        )}
      </ContentBox>
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
