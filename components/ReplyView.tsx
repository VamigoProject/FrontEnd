import { Reply } from 'utils/types';
import ProfileWithNickname from 'components/ProfileWithNickname';
import ContentBox from 'components/ContentBox';
import styled, { createGlobalStyle } from 'styled-components';
import useUserStore from 'stores/user';
import { IconButton, Menu, MenuItem } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useState } from 'react';
import ReportIcon from '@mui/icons-material/Report';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteReplyApi } from 'utils/api';
import useReviewStore from 'stores/review';

interface Props {
  reviewId: number;
  reply: Reply;
}

const GlobalStyle = createGlobalStyle`
  @keyframes replyAppear{
    from{
      opacity: 0;
      transform: translateY(25%);
    }
    to{
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Wrapper = styled.div`
  animation: replyAppear 0.5s;
  animation-timing-function: ease-in-out;
`;

const Padder = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  width: 100%;
  height: 100%;
`;

const HeaderLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ReplyView = ({ reviewId, reply }: Props) => {
  const myUid = useUserStore((state) => state.uid);

  const { replyId, time, user, comment } = reply;
  const { uid, nickname, profile } = user;

  const { deleteReplyAction } = useReviewStore((state) => state);

  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const onClickList = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
    setOpen(true);
  };
  const onClose = () => {
    setAnchorElement(null);
    setOpen(false);
  };

  const onClickDeleteReply = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await deleteReplyApi(reviewId, myUid!, replyId);
      deleteReplyAction(reviewId, replyId);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <ContentBox opacity={0.3}>
          <Padder>
            <HeaderLine>
              <ProfileWithNickname
                nickname={nickname}
                profile={profile}
                size="small"
              />
              <IconButton
                id="list-button"
                aria-controls={open ? 'list-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={onClickList}
              >
                <FormatListBulletedIcon fontSize="small" />
              </IconButton>
              <Menu
                id="list-menu"
                anchorEl={anchorElement}
                aria-labelledby="list-button"
                open={open}
                onClose={onClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                disableScrollLock={true}
              >
                <MenuItem>uid: {uid}</MenuItem>
                <MenuItem>replyId: {replyId}</MenuItem>
                <MenuItem>
                  <ReportIcon style={{ marginRight: '0.5rem' }} />
                  신고
                </MenuItem>
                {uid === myUid && (
                  <MenuItem onClick={onClickDeleteReply}>
                    <DeleteIcon style={{ marginRight: '0.5rem' }} />
                    삭제
                  </MenuItem>
                )}
              </Menu>
            </HeaderLine>
            {reply.comment}
          </Padder>
        </ContentBox>
      </Wrapper>
    </>
  );
};

export default ReplyView;
