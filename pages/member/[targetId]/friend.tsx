import { ProfileLayout } from 'components/layout';
import { ContentBox, ProfileWithNickname } from 'components/common';
import { Empty } from 'components';
import { useUserStore } from 'stores';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { memberFriendApi } from 'utils/api';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FollowWrapper = styled.div`
  width: 100%;
  height: 40rem;
  min-width: 20rem;
`;

const FollowHeader = styled.div`
  position: sticky;
  top: 0;

  width: 100%;
  height: 3rem;
  background-color: rgba(76, 175, 80, 0.98);
  display: flex;
  justify-content: center;
  align-items: center;
  & > h2 {
    margin: 0;
    padding: 0;
  }
  z-index: 10;
`;

const FollowBody = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem;

  width: 100%;
  max-height: 37rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: none;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.2);
  }
  &::-webkit-scrollbar-corner {
    visibility: none;
  }
`;

const ProfileWrapper = styled.div`
  height: 5rem;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const friend = () => {
  const router = useRouter();

  const { uid } = useUserStore((state) => state);
  const [targetId, setTargetId] = useState<number>(0);
  const [nickname, setNickname] = useState<string>('');
  const [profile, setProfile] = useState<string | null>('');
  const [introduce, setIntroduce] = useState<string>('');
  const [isFollower, setIsFollower] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const [follower, setFollower] = useState<Array<User>>([]);
  const [following, setFollowing] = useState<Array<User>>([]);

  const fetch = async (targetId: number) => {
    try {
      const { user, follower, following } = await memberFriendApi(
        uid!,
        targetId,
      );
      setNickname(user.nickname);
      setProfile(user.profile);
      setIntroduce(user.introduce);
      setIsFollower(user.isFollower);
      setIsFollowing(user.isFollowing);
      setTargetId(targetId);

      setFollower(follower);
      setFollowing(following);
    } catch (error) {
      alert(error);
      router.replace('/home');
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (typeof router.query.targetId === 'string') {
      if (uid === parseInt(router.query.targetId)) {
        router.replace(`/member/profile`);
      } else {
        fetch(parseInt(router.query.targetId));
      }
    }
  }, [router.isReady, router.query.targetId]);

  return (
    <ProfileLayout
      targetId={targetId}
      nickname={nickname}
      profile={profile}
      introduce={introduce}
      isFollower={isFollower}
      isFollowing={isFollowing}
      setIsFollowing={setIsFollowing}
    >
      <ContentBox padding="1rem">
        <Wrapper>
          <FollowWrapper>
            <FollowHeader>
              <h2>팔로워</h2>
            </FollowHeader>
            <FollowBody>
              {follower.length === 0 && <Empty message="팔로워가 없습니다" />}
              {follower.map((f, i) => (
                <ProfileWrapper
                  key={f.uid + '_' + i}
                  onClick={(e) => {
                    router.push(`/member/${f.uid}`);
                  }}
                >
                  <ProfileWithNickname
                    key={f.uid + '_' + i}
                    nickname={f.nickname}
                    profile={f.profile}
                    size="large"
                  />
                </ProfileWrapper>
              ))}
            </FollowBody>
          </FollowWrapper>
          <FollowWrapper>
            <FollowHeader>
              <h2>팔로잉</h2>
            </FollowHeader>
            <FollowBody>
              {following.length === 0 && (
                <Empty message="팔로우하고 있는 사람이 없습니다" />
              )}
              {following.map((f, i) => (
                <ProfileWrapper
                  key={f.uid + '_' + i}
                  onClick={(e) => {
                    router.push(`/member/${f.uid}`);
                  }}
                >
                  <ProfileWithNickname
                    key={f.uid + '_' + i}
                    nickname={f.nickname}
                    profile={f.profile}
                    size="large"
                  />
                </ProfileWrapper>
              ))}
            </FollowBody>
          </FollowWrapper>
        </Wrapper>
      </ContentBox>
    </ProfileLayout>
  );
};

export default friend;
