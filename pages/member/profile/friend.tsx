import { ProfileLayout } from 'components/';
import { ContentBox } from 'components/common';
import { useUserStore, useSystemStore } from 'stores';
import ProfileWithNickname from 'components/common/ProfileWithNickname';
import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import { myFriendApi } from 'utils/api';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
`;

const FollowWrapper = styled.div`
  width: 50%;
  height: 40rem;
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
  justify-content: center;

  width: 100%;
  height: 37rem;
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
    <ProfileLayout>
      <ContentBox padding="1rem">
        <Wrapper>
          <FollowWrapper>
            <FollowHeader>
              <h2>팔로워</h2>
            </FollowHeader>
            <FollowBody>
              {follower.length === 0 && '팔로워가 없습니다'}
              {follower.map((f, i) => (
                <ProfileWrapper key={f.uid + '_' + i}>
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
              {following.length === 0 && '팔로우하고 있는 사람이 없습니다'}
              {following.map((f, i) => (
                <ProfileWrapper key={f.uid + '_' + i}>
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
