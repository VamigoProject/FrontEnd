import React, { MouseEvent } from 'react';
import { useUserStore } from 'stores';
import styled from 'styled-components';
import { Badge } from '@mui/material';
import { ContentBox, ProfileAvatar } from 'components/common';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { followApi, unfollowApi } from 'utils/api';

const Wrapper = styled.div`
  width: 100%;
  height: 10.5rem;
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

const RightSide = styled.div`
  position: absolute;
  right: 0;
  transform: translate(-25%, 0%);

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.5rem;
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
  targetId: number;
  nickname: string;
  profile: string | null;
  introduce: string;
  isFollower: boolean;
  isFollowing: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setIsFollowing: Function;
  current: number;
  children?: React.ReactNode;
}

const ProfileLayout = ({
  targetId,
  nickname,
  profile,
  introduce,
  isFollower,
  isFollowing,
  setIsFollowing,
  current,
  children,
}: Props) => {
  const router = useRouter();
  const { uid } = useUserStore((state) => state);

  const onClickReview = () => {
    router.push(`/member/${targetId}/review`);
  };

  const onClickFriend = () => {
    router.push(`/member/${targetId}/friend`);
  };

  const onClickLike = () => {
    router.push(`/member/${targetId}/like`);
  };

  const onClickStatistics = () => {
    router.push(`/member/${targetId}/statistics`);
  };

  const onClickFollow = async (
    e: MouseEvent<HTMLElement>,
    uid: number,
    targetId: number,
  ) => {
    e.preventDefault();
    try {
      await followApi(uid, targetId);
      setIsFollowing(true);
      alert('팔로우하였습니다');
    } catch (error) {
      alert(error);
    }
  };

  const onClickUnfollow = async (
    e: MouseEvent<HTMLElement>,
    uid: number,
    targetId: number,
  ) => {
    e.preventDefault();
    try {
      await unfollowApi(uid, targetId);
      setIsFollowing(false);
      alert('언팔로우하였습니다');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Wrapper>
        <ContentBox opacity={0.1} padding="0">
          <Row>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
            <RightSide>
              {isFollowing && (
                <Button
                  variant="outlined"
                  sx={{
                    width: '4.5rem',
                    fontSize: '0.8rem',
                    padding: '0.2rem',
                  }}
                  onClick={(e) => onClickUnfollow(e, uid!, targetId)}
                >
                  언팔로우
                </Button>
              )}
              {!isFollowing && (
                <Button
                  variant="contained"
                  sx={{
                    width: '4.5rem',
                    fontSize: '0.8rem',
                    padding: '0.2rem',
                  }}
                  onClick={(e) => onClickFollow(e, uid!, targetId)}
                >
                  팔로우
                </Button>
              )}
              <div>{isFollower && '당신을 팔로우하고 있습니다'}</div>
            </RightSide>
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
    </>
  );
};

export default ProfileLayout;
