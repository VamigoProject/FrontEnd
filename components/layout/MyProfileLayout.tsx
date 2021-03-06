import React, { useState } from 'react';
import { useUserStore } from 'stores';
import styled from 'styled-components';
import { Badge } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { EditProfile } from 'components';
import { ContentBox, Dialog, ProfileAvatar } from 'components/common';
import Router from 'next/router';

const Wrapper = styled.div`
  width: 100%;
  height: 10.5rem;
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
  padding-bottom: 1rem;
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 1rem;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.75rem;
`;

const Introduce = styled.span`
  font-size: 0.8rem;
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface NavigationMenuTypes {
  background: string;
}

const NavigationMenu = styled.span<NavigationMenuTypes>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 2.8rem;
  background-color: ${(props) => props.background};
  &:hover {
    cursor: pointer;
    background-color: rgba(76, 175, 80, 0.5);
  }
`;

interface Props {
  current: number;
  children?: React.ReactNode;
}

const MyProfileLayout = ({ current, children }: Props) => {
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

  const { nickname, profile, introduce } = useUserStore((state) => state);

  const onClickReview = () => {
    Router.push('/member/profile/myreview');
  };

  const onClickFriend = () => {
    Router.push('/member/profile/friend');
  };

  const onClickLike = () => {
    Router.push('/member/profile/like');
  };

  const onClickStatistics = () => {
    Router.push('/member/profile/statistics');
  };

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
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                nickname={nickname!}
                profile={profile}
              />
            </Badge>
            <Information>
              <h2>{nickname}</h2>
              <Introduce>{introduce}</Introduce>
            </Information>
          </Row>
          <Navigation>
            <NavigationMenu
              onClick={onClickFriend}
              background={
                current === 0 ? 'rgba(76, 175, 80, 0.8)' : 'rgb(255, 255, 255)'
              }
            >
              <h4>친구보기</h4>
            </NavigationMenu>
            <NavigationMenu
              onClick={onClickReview}
              background={
                current === 1 ? 'rgba(76, 175, 80, 0.8)' : 'rgb(255, 255, 255)'
              }
            >
              <h4>리뷰</h4>
            </NavigationMenu>
            <NavigationMenu
              onClick={onClickLike}
              background={
                current === 2 ? 'rgba(76, 175, 80, 0.8)' : 'rgb(255, 255, 255)'
              }
            >
              <h4>좋아요</h4>
            </NavigationMenu>
            <NavigationMenu
              onClick={onClickStatistics}
              background={
                current === 3 ? 'rgba(76, 175, 80, 0.8)' : 'rgb(255, 255, 255)'
              }
            >
              <h4>통계</h4>
            </NavigationMenu>
          </Navigation>
        </ContentBox>
      </Wrapper>
      <Body>{children}</Body>
      {open && (
        <Dialog
          onClose={onClickClose}
          width="25rem"
          height="25rem"
          title="프로필 수정"
        >
          <EditProfile />
        </Dialog>
      )}
    </>
  );
};

export default MyProfileLayout;
