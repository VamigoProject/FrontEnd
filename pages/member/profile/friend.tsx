import { MyProfileLayout } from 'components/layout';
import { ContentBox, ProfileWithNickname } from 'components/common';
import { Empty } from 'components';
import { useUserStore, useSystemStore } from 'stores';
import styled from 'styled-components';
import { useEffect } from 'react';
import { myFriendApi } from 'utils/api';
import { useRouter } from 'next/router';

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
  const { startLoadingAction, endLoadingAction } = useSystemStore(
    (state) => state,
  );
  const { following, follower, setFollower, setFollowing } = useUserStore(
    (state) => state,
  );

  const fetch = async () => {
    setFollower([]);
    setFollowing([]);
    startLoadingAction();
    try {
      const result = await myFriendApi(uid!);
      setFollower(result.follower);
      setFollowing(result.following);
    } catch (error) {
      alert(error);
    }
    endLoadingAction();
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <MyProfileLayout current={0}>
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
    </MyProfileLayout>
  );
};

export default friend;
