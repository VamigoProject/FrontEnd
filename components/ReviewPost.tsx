/* eslint-disable prefer-const */
import styled, { createGlobalStyle } from 'styled-components';
import { ProfileWithNickname, ContentBox, Dialog } from 'components/common';
import { Rating, Chip, IconButton, Menu, MenuItem } from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import AnimationIcon from '@mui/icons-material/Animation';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import React, { useState } from 'react';
import {
  ReviewReply,
  EmptyReply,
  EditReview,
  LocationMap,
  ReportReview,
} from 'components';
import { useUserStore } from 'stores';
import ReportIcon from '@mui/icons-material/Report';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteReviewApi, likeApi, unlikeApi } from 'utils/api';
import { useRouter } from 'next/router';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface Props {
  review: Review;
  // eslint-disable-next-line @typescript-eslint/ban-types
  store: Function;
}

const GlobalStyle = createGlobalStyle`
  @keyframes smoothAppear{
    from{
      opacity: 0;
      transform: translateX(25%);
    }
    to{
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const Container = styled.div`
  margin-bottom: 1.5rem;
  animation: smoothAppear 0.75s;
  animation-timing-function: ease-in-out;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
`;

const Padder = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const HeaderLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfileWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
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

const Spoiler = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
  }
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

const WorkWrapper = styled.span`
  & > div {
    cursor: pointer;
  }
`;

const ReviewPost = ({ review, store }: Props) => {
  const router = useRouter();
  let {
    reviewId,
    time,
    uid,
    nickname,
    profile,
    workId,
    workName,
    workCategory,
    comment,
    lat,
    lng,
    rating,
    image,
    reply,
    likes,
    isLiked,
    spoiler,
  } = review;

  try {
    time = new Date(time);
  } catch {
    // eslint-disable-next-line no-self-assign
    time = time;
  }

  if (reply === null) {
    reply = [];
  }

  if (profile === 'NoImage') {
    profile = null;
  }

  const myUid = useUserStore((state) => state.uid);
  const { likeAction, unLikeAction, deleteReviewAction } = store(
    (state: any) => state,
  );

  const [isReplyOpened, setIsReplyOpened] = useState<boolean>(false);
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const [isMapOpened, setIsMapOpened] = useState<boolean>(false);

  const onClickList = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
    setOpen(true);
  };
  const onClose = () => {
    setAnchorElement(null);
    setOpen(false);
  };

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const onClickEdit = () => {
    setIsEditOpen(true);
  };
  const onCloseEdit = () => {
    setIsEditOpen(false);
  };

  const onClickDeleteReview = async () => {
    try {
      await deleteReviewApi(myUid!, reviewId);
      deleteReviewAction(reviewId);
      alert('리뷰를 성공적으로 삭제했습니다');
    } catch (error) {
      alert(error);
    }
  };

  const [isSpoiler, setIsSpoiler] = useState<boolean>(spoiler);

  const onClickMap = () => {
    setIsMapOpened((prev) => {
      return !prev;
    });
  };
  const onClickSpoiler = () => {
    setIsSpoiler(false);
  };

  const onClickReply = () => {
    if (isReplyOpened === false) {
      setIsReplyOpened(true);
    } else {
      setIsReplyOpened(false);
    }
  };

  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const onClickReport = () => {
    setIsReportOpen(true);
  };
  const onCloseReport = () => {
    setIsReportOpen(false);
  };

  const onClickLike = async () => {
    try {
      if (isLiked) {
        await unlikeApi(reviewId, myUid!);
        unLikeAction(reviewId);
      } else {
        await likeApi(reviewId, myUid!);
        likeAction(reviewId);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container>
      <GlobalStyle />
      <ContentBox opacity={0.1}>
        <Wrapper>
          <Padder>
            <HeaderLine>
              <ProfileWrapper onClick={(e) => router.push(`/member/${uid}`)}>
                <ProfileWithNickname
                  nickname={nickname}
                  profile={profile}
                  size="medium"
                />
              </ProfileWrapper>
              <TimeSpan>
                {[
                  time.getFullYear(),
                  (time.getMonth() + 1).toString().padStart(2, '0'),
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
            {isSpoiler && (
              <Spoiler onClick={onClickSpoiler}>
                스포일러가 존재할 수 있습니다
              </Spoiler>
            )}
            {!isSpoiler && (
              <>
                <CommentWrapper>{comment}</CommentWrapper>
                <Rating name="rating" value={rating} readOnly />
                <br />
              </>
            )}
            <WorkWrapper
              onClick={(e) => {
                router.push(`/work/${workId}`);
              }}
            >
              {workCategory === 'book' && (
                <Chip label={workName} size="small" icon={<MenuBookIcon />} />
              )}
              {workCategory === 'movie' && (
                <Chip
                  label={workName}
                  size="small"
                  icon={<LocalMoviesIcon />}
                />
              )}
              {workCategory === 'drama' && (
                <Chip label={workName} size="small" icon={<LiveTvIcon />} />
              )}
              {workCategory === 'animation' && (
                <Chip label={workName} size="small" icon={<AnimationIcon />} />
              )}
            </WorkWrapper>
            {lat && lng && (
              <IconButton onClick={onClickMap}>
                {!isMapOpened && <LocationOnIcon color="primary" />}
                {isMapOpened && <LocationOnIcon />}
              </IconButton>
            )}
            {lat && lng && isMapOpened && (
              <LocationMap lat={lat} lng={lng}></LocationMap>
            )}
          </Padder>
          <FooterWrapper>
            <IconWrapper>
              <IconButton onClick={onClickReply}>
                {!isReplyOpened && <ChatBubbleIcon fontSize="medium" />}
                {isReplyOpened && (
                  <ChatBubbleIcon fontSize="medium" color="primary" />
                )}
              </IconButton>
              {reply.length <= 9999 && reply.length}
              {reply.length > 9999 && '9999+'}
            </IconWrapper>
            <IconWrapper>
              <IconButton onClick={onClickLike}>
                {!isLiked && <ThumbUpIcon fontSize="medium" />}
                {isLiked && <ThumbUpIcon fontSize="medium" color="primary" />}
              </IconButton>
              {likes <= 9999 && likes}
              {likes > 9999 && '9999+'}
              {likes === null && '0'}
            </IconWrapper>
            <RightSpan>
              <IconButton
                id="list-button"
                aria-controls={open ? 'list-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={onClickList}
              >
                <FormatListBulletedIcon fontSize="large" />
              </IconButton>
              <Menu
                id="list-menu"
                anchorEl={anchorElement}
                aria-labelledby="list-button"
                open={open}
                onClose={onClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                disableScrollLock={true}
              >
                <MenuItem onClick={onClickReport}>
                  <ReportIcon style={{ marginRight: '0.5rem' }} />
                  신고
                </MenuItem>
                {isReportOpen && (
                  <Dialog
                    onClose={onCloseReport}
                    width="15rem"
                    height="20rem"
                    title="신고하기"
                  >
                    <ReportReview
                      onClose={onCloseReport}
                      spoiler={spoiler}
                      reviewId={reviewId}
                    />
                  </Dialog>
                )}
                {uid === myUid && (
                  <MenuItem onClick={onClickEdit}>
                    <EditIcon style={{ marginRight: '0.5rem' }} />
                    수정
                  </MenuItem>
                )}
                {isEditOpen && (
                  <Dialog
                    onClose={onCloseEdit}
                    width="40rem"
                    height="25rem"
                    title="리뷰수정"
                  >
                    <EditReview
                      reviewId={reviewId}
                      rating={rating}
                      comment={comment}
                      image={image}
                      spoiler={spoiler}
                      onClose={onCloseEdit}
                      store={store}
                    />
                  </Dialog>
                )}

                {uid === myUid && (
                  <MenuItem onClick={onClickDeleteReview}>
                    <DeleteIcon style={{ marginRight: '0.5rem' }} />
                    삭제
                  </MenuItem>
                )}
              </Menu>
            </RightSpan>
          </FooterWrapper>
          <Padder>
            {isReplyOpened && reply?.length !== 0 && (
              <ReviewReply reviewId={reviewId} reply={reply} store={store} />
            )}
            {isReplyOpened && reply?.length === 0 && (
              <EmptyReply reviewId={reviewId} store={store} />
            )}
            {isReplyOpened && reply === null && (
              <EmptyReply reviewId={reviewId} store={store} />
            )}
          </Padder>
        </Wrapper>
      </ContentBox>
    </Container>
  );
};

export default ReviewPost;
