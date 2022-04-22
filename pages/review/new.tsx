import ContentBox from 'components/ContentBox';
import useInput from 'hooks/useInput';
import ProfileAvatar from 'components/ProfileAvatar';
import { Autocomplete, Box, Rating, TextField } from '@mui/material';
import { green } from '@mui/material/colors';
import styled from 'styled-components';
import useUserStore from 'stores/user';
import EditIcon from '@mui/icons-material/Edit';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import AnimationIcon from '@mui/icons-material/Animation';

const Wrapper = styled.div`
  width: 100%;
  height: 20rem;
`;
const Form = styled(Box)`
  width: 100%;
  height: 20rem;
  padding: 1rem;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 15rem;
  height: 3rem;
  margin-bottom: 0.5rem;
`;
const CommentWrapper = styled.div`
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
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

const Circle = styled.div`
  position: relative;
  left: 100%;
  transform: translate(-125%, -125%);
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
`;

const WorkList = [
  { label: '인터스텔라', work: 'movie' },
  { label: '인터누텔라', work: 'movie' },
  { label: '인터폰', work: 'movie' },
  { label: '인터라텔라', work: 'movie' },
  { label: '안티스텔라', work: 'movie' },
  { label: '잉테스텔라', work: 'movie' },
  { label: '누텔라', work: 'movie' },
  { label: '해리포터 : 마법사의 돌', work: 'movie' },
  { label: '해리포터 : 비밀의 방', work: 'book' },
  { label: '해리포터 : 아즈카반의 죄수', work: 'book' },
  { label: '해리포터 : 불의 잔', work: 'animation' },
  { label: '해리포터 : 불사조 기사단', work: 'drama' },
  { label: '해리포터 : 혼혈 왕자', work: 'drama' },
  { label: '해리포터 : 죽음의 성물', work: 'movie' },
  { label: '해리포터 : 저주받은 아이', work: 'animation' },
  { label: '해리포터 : ', work: 'drama' },
  { label: '해리포터 : ', work: 'book' },
];

const newReview = () => {
  const { nickname, profile } = useUserStore((state) => state);

  const [comment, onChangeComment] = useInput('');
  const [rating, onChangeRating] = useInput(0);

  return (
    <Wrapper>
      <ContentBox>
        <Form component="form">
          <ProfileWrapper>
            <ProfileAvatar nickname={nickname!} profile={profile} />
            <span style={{ marginLeft: '0.5rem' }}>{nickname}</span>
          </ProfileWrapper>
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
            />
          </CommentWrapper>
          <br />
          <WorkWrapper>
            <Autocomplete
              disablePortal
              id="work"
              size="medium"
              autoHighlight
              options={WorkList}
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option.label}
                  {option.work === 'movie' && <LocalMoviesIcon />}
                  {option.work === 'book' && <MenuBookIcon />}
                  {option.work === 'drama' && <LiveTvIcon />}
                  {option.work === 'animation' && <AnimationIcon />}
                </Box>
              )}
              renderInput={(params) => <TextField {...params} label="작품" />}
            />
          </WorkWrapper>
          <br />
          <Rating
            name="review-rating"
            value={rating}
            onChange={onChangeRating}
          />
          <Circle>
            <EditIcon color="primary" fontSize="large" />
          </Circle>
        </Form>
      </ContentBox>
    </Wrapper>
  );
};

export default newReview;
