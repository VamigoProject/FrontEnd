interface Props {
  reviewId: number;
  rating: number;
  comment: string;
  image: Array<string>;
  spoiler: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClose: Function;
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ContentBox } from 'components/common';
import { useInput } from 'hooks';
import {
  Box,
  Rating,
  TextField,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { green } from '@mui/material/colors';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import ProfileWithNickname from 'components/common/ProfileWithNickname';
import { updateReviewApi } from 'utils/api';
import { useSystemStore, useReviewStore, useUserStore } from 'stores';

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

const EditReview = ({
  reviewId,
  rating,
  comment,
  image,
  spoiler,
  onClose,
}: Props) => {
  const { startLoadingAction, endLoadingAction } = useSystemStore(
    (state) => state,
  );
  const { updateReviewAction } = useReviewStore((state) => state);

  const { uid, nickname, profile } = useUserStore((state) => state);

  const [afterComment, onChangeComment] = useInput(comment);
  const [afterRating, onChangeRating] = useInput(rating);
  const [afterImage, onChangeImage] = useInput(image);
  const [afterSpoiler, setSpoiler] = useInput(spoiler);

  const onChangeSpoiler = () => {
    setSpoiler((prev: boolean) => !prev);
  };

  const onSubmit = async (e: any) => {
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

      updateReviewAction(
        reviewId,
        afterRating,
        afterComment,
        afterImage,
        afterSpoiler,
      );

      alert('리뷰가 성공적으로 수정되었습니다.');
      onClose();
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
          // onSubmit={onSubmit}
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
              value={afterComment}
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
                value={afterRating}
                onChange={onChangeRating}
              />
              <FormControlLabel
                label="스포일러"
                control={
                  <Checkbox checked={afterSpoiler} onChange={onChangeSpoiler} />
                }
              />
            </span>
            <span>
              <IconButton onClick={(e) => onSubmit(e)}>
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

export default EditReview;
