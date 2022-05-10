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
import { searchWorkApi, createReviewApi } from 'utils/api';
import useSystemStore from 'stores/system';
import Router from 'next/router';
import { useRef } from 'react';
import useReviewAction from 'stores/review';
import { Work } from 'utils/types';

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

const newReview = () => {
  const { startLoadingAction, endLoadingAction } = useSystemStore(
    (state) => state,
  );
  const { createReviewAction } = useReviewAction((state) => state);

  const { uid, nickname, profile } = useUserStore((state) => state);

  const [comment, onChangeComment] = useInput('');
  const [works, setWorks] = useState<Array<Work>>([]);
  const [workName, setWorkName] = useState<string | null>('');
  const [workCategory, setWorkCategory] = useState<string | null>('');
  const [rating, onChangeRating] = useInput(0);
  const [spoiler, setSpoiler] = useInput(false);

  const timerId = useRef<any>();

  const onChangeSpoiler = () => {
    setSpoiler((prev: boolean) => !prev);
  };

  //작품 검색의 input값이 바뀔 때
  const onChangeWorkInput = (
    e: SyntheticEvent<Element, Event>,
    value: string,
  ) => {
    if (timerId) {
      clearTimeout(timerId.current);
    }
    if (value !== '') {
      timerId.current = setTimeout(async () => {
        try {
          const response = await searchWorkApi(value);
          setWorks(response);
        } catch (error) {
          alert(error);
        }
      }, 150);
    }
  };

  //작품 검색에서 작품을 선택하였을 때
  const onChangeWork = (
    e: SyntheticEvent<Element, Event>,
    value: Work | null,
  ) => {
    if (value === null) {
      setWorkName(null);
      setWorkCategory(null);
    } else {
      setWorkName(value.name);
      setWorkCategory(value.category);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startLoadingAction();
    try {
      const reviewId = await createReviewApi(
        uid!,
        comment,
        workName!,
        workCategory!,
        rating!,
        spoiler,
      );
      alert(`리뷰가 성공적으로 등록되었습니다`);
      createReviewAction(
        reviewId,
        uid!,
        nickname!,
        profile,
        workName!,
        workCategory!,
        comment,
        rating,
        [],
        spoiler,
      );
      Router.push('/home');
    } catch (error) {
      alert(error);
    }
    endLoadingAction();
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
          <br />
          <WorkWrapper>
            <Autocomplete
              disablePortal
              id="work"
              size="medium"
              autoHighlight
              // options={WorkList}
              options={works}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) => onChangeWork(e, value)}
              onInputChange={(e, value) => onChangeWorkInput(e, value)}
              renderOption={(props, option) => (
                <Box {...props} key={option.id} component="li">
                  {option.name}
                  {option.category === 'movie' && (
                    <LocalMoviesIcon key={option.id} />
                  )}
                  {option.category === 'book' && (
                    <MenuBookIcon key={option.id} />
                  )}
                  {option.category === 'drama' && (
                    <LiveTvIcon key={option.id} />
                  )}
                  {option.category === 'animation' && (
                    <AnimationIcon key={option.id} />
                  )}
                  {option.category === 'game' && (
                    <SportsEsportsIcon key={option.id} />
                  )}
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} label="작품 검색" />
              )}
            />
          </WorkWrapper>
          <br />
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

export default newReview;
