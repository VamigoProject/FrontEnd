import styled from 'styled-components';
import ProfileWithNickname from 'components/ProfileWithNickname';
import { Rating, Chip } from '@mui/material';
import { Review, User, Reply } from 'utils/types';
import ContentBox from 'components/ContentBox';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import AnimationIcon from '@mui/icons-material/Animation';
import ReplyIcon from '@mui/icons-material/Reply';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

interface Props {
  review: Review;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 0.25rem;
`;

const Padder = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const HeaderLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TimeSpan = styled.span`
  width: 12rem;
  text-align: right;
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;
`;

const CommentWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 2.5rem;
  margin-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 4px 6px rgb(0, 0, 0, 0.05);
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  width: 45%;
`;

const RightSpan = styled.span`
  text-align: right;
  width: 10%;
`;

const ReviewPost = ({ review }: Props) => {
  const {
    time,
    User,
    workName,
    workCategory,
    comment,
    rate,
    Reply,
    like,
    isLiked,
  } = review;

  const { nickname, profile } = User;

  let icon;
  switch (workCategory) {
    case 'movie':
      icon = <LocalMoviesIcon />;
      break;
    case 'book':
      icon = <MenuBookIcon />;
      break;
    case 'drama':
      icon = <LiveTvIcon />;
      break;
    case 'animation':
      icon = <AnimationIcon />;
      break;
  }

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <ContentBox>
        <Wrapper>
          <Padder>
            <HeaderLine>
              <ProfileWithNickname nickname={nickname} profile={profile} />
              <TimeSpan>
                {[
                  time.getFullYear(),
                  time.getMonth().toString().padStart(2, '0'),
                  time.getDate().toString().padStart(2, '0'),
                ].join('-')}
                <br />
                {[
                  time.getHours().toString().padStart(2, '0'),
                  time.getMinutes().toString().padStart(2, '0'),
                ].join(':')}
              </TimeSpan>
            </HeaderLine>
            <Line />
            <CommentWrapper>{comment}</CommentWrapper>
            <Rating name="rate" value={rate} readOnly />
            <br />
            <Chip label={workName} size="small" icon={icon} />
          </Padder>
          <FooterWrapper>
            <IconWrapper>
              <ReplyIcon fontSize="large" />
              {Reply.length <= 9999 && Reply.length}
              {Reply.length > 9999 && '9999+'}
            </IconWrapper>
            <IconWrapper>
              {!isLiked && <ThumbUpIcon fontSize="large" />}
              {isLiked && <ThumbUpIcon fontSize="large" color="primary" />}
              {like <= 9999 && like}
              {like > 9999 && '9999+'}
            </IconWrapper>
            <RightSpan>
              <FormatListBulletedIcon fontSize="large" />
            </RightSpan>
          </FooterWrapper>
        </Wrapper>
      </ContentBox>
    </div>
  );
};

export default ReviewPost;
