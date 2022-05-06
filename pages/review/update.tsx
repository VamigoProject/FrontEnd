interface Props {
  reviewId: number;
  rating: number;
  comment: string;
  image: Array<string>;
  spoiler: boolean;
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import ContentBox from 'components/ContentBox';
import useInput from 'hooks/useInput';
import {
  Autocomplete,
  Box,
  Rating,
  TextField,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { green } from '@mui/material/colors';
import styled from 'styled-components';
import useUserStore from 'stores/user';
import EditIcon from '@mui/icons-material/Edit';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import AnimationIcon from '@mui/icons-material/Animation';
import ProfileWithNickname from 'components/ProfileWithNickname';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { SyntheticEvent, useState } from 'react';
import { updateReviewApi } from 'utils/api';
import useSystemStore from 'stores/system';
import Router from 'next/router';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const CommentWrapper = styled.div`
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  margin-top: 0.5rem;
`;

const CommentField = styled(TextField)`
  width: 100%;
  height: 100%;
`;

const WorkWrapper = styled.div`
  display: inline-block;
  width: 20rem;
  height: 4rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 50%;
  background-color: ${green[100]};
  &:hover {
    cursor: pointer;
  }
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 4px 6px rgb(0, 0, 0, 0.05);
`;

interface WorkProps {
  name: string;
  category: string;
}

const WorkList: Array<WorkProps> = [
  { name: '인터스텔라', category: 'movie' },
  { name: '인터누텔라', category: 'game' },
  { name: '인터폰', category: 'animation' },
  { name: '인터라텔라', category: 'movie' },
  { name: '안티스텔라', category: 'game' },
  { name: '잉테스텔라', category: 'movie' },
  { name: '누텔라', category: 'movie' },
  { name: '해리포터 : 마법사의 돌', category: 'movie' },
  { name: '해리포터 : 비밀의 방', category: 'book' },
  { name: '해리포터 : 아즈카반의 죄수', category: 'book' },
  { name: '해리포터 : 불의 잔', category: 'animation' },
  { name: '해리포터 : 불사조 기사단', category: 'drama' },
  { name: '해리포터 : 혼혈 왕자', category: 'drama' },
  { name: '해리포터 : 죽음의 성물', category: 'movie' },
  { name: '해리포터 : 저주받은 아이', category: 'animation' },
  { name: '해리포터 : ', category: 'drama' },
  { name: '해리포터 : ', category: 'book' },
  { name: '원신', category: 'game' },
];

const update = ({ reviewId, rating, comment, image, spoiler }: Props) => {
  const { startLoadingAction, endLoadingAction } = useSystemStore(
    (state) => state,
  );
  const { uid, nickname, profile } = useUserStore((state) => state);

  const [afterComment, onChangeComment] = useInput(comment);
  const [afterRating, onChangeRating] = useInput(rating);
  const [afterImage, onChangeImage] = useInput(image);
  const [afterSpoiler, setSpoiler] = useInput(spoiler);

  const onChangeSpoiler = () => {
    setSpoiler((prev: boolean) => !prev);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startLoadingAction();
    try {
      await updateReviewApi(
        uid!,
        reviewId,
        afterRating!,
        afterComment,
        afterImage,
        afterSpoiler,
      );
      endLoadingAction();
      alert('리뷰가 성공적으로 수정되었습니다.');
    } catch (error) {
      endLoadingAction();
      alert(error);
    }
  };

  return (
    <Wrapper>
      <ContentBox opacity={0.1}>
        <Box
          style={{ padding: '1rem', width: '100%', height: '100%' }}
          component="form"
          onSubmit={onSubmit}
        >
          <ProfileWithNickname
            nickname={nickname!}
            profile={profile}
            size="medium"
          />
          <CommentWrapper>
            <CommentField
              id="comment"
              label="Comment"
              multiline
              rows={6}
              value={comment}
              onChange={onChangeComment}
              required
              sx={{
                bgcolor: 'white',
                boxShadow: 1,
                borderRadius: 1,
              }}
              inputProps={{
                style: {
                  padding: '0.25rem',
                },
              }}
              spellCheck={false}
            />
          </CommentWrapper>
          <Row>
            <span
              style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
            >
              <Rating
                name="review-rating"
                value={rating}
                onChange={onChangeRating}
              />
              <FormControlLabel
                label="스포일러"
                control={
                  <Checkbox checked={spoiler} onChange={onChangeSpoiler} />
                }
              />
            </span>
            <span>
              <IconButton type="submit">
                <Circle>
                  <EditIcon color="primary" fontSize="large" />
                </Circle>
              </IconButton>
            </span>
          </Row>
        </Box>
      </ContentBox>
    </Wrapper>
  );
};

export default update;
