import useUserStore from 'stores/user';
import ContentBox from 'components/ContentBox';
import ProfileAvatar from 'components/ProfileAvatar';
import styled from 'styled-components';
import { Badge, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import useInput from 'hooks/useInput';
import Dialog from 'components/Dialog';

const Wrapper = styled.div`
  width: 100%;
  height: 25rem;
`;

const EditCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  background-color: rgba(210, 210, 210, 0.9);
  &:hover {
    cursor: pointer;
    background-color: rgba(180, 180, 180, 0.9);
  }
`;

const Row = styled.div`
  display: flex;
  align-items: flex-end;
  background-color: rgba(50, 50, 50, 0.05);
  padding: 0.5rem;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.75rem;
`;

const Introduce = styled.span`
  font-size: 0.8rem;
`;

interface DialogProps {
  open: boolean;
  onClose: () => void;
  nickname: string;
  profile: string;
  introduce: string;
}

const profile = () => {
  const [open, setOpen] = useState<boolean>(false);
  const onClickOpen = () => {
    setOpen(true);
  };
  const onClickClose = () => {
    setOpen(false);
  };

  //profile 에디트 둥근 부분
  const EditBadge = () => {
    return (
      <EditCircle onClick={onClickOpen}>
        <EditIcon />
      </EditCircle>
    );
  };

  const { nickname, profile } = useUserStore((state) => state);
  const introduce = '물고기 폭파용이 아니라 화력 강화형을 사용했어';

  return (
    <>
      <Wrapper>
        <ContentBox opacity={0.1} padding="0">
          <Row>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={<EditBadge />}
            >
              <ProfileAvatar
                size="xLarge"
                nickname={nickname!}
                profile={profile}
              />
            </Badge>
            <Information>
              <h2>{nickname}</h2>
              <Introduce>{introduce}</Introduce>
            </Information>
          </Row>
          <Row>asdf</Row>
        </ContentBox>
      </Wrapper>
      {open && (
        <Dialog onClose={onClickClose} width="20rem" height="10rem"></Dialog>
      )}
    </>
  );
};

export default profile;
