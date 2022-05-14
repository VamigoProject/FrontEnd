import ProfileLayout from 'components/ProfileLayout';
import ContentBox from 'components/ContentBox';
import useUserStore from 'stores/user';
import ProfileWithNickname from 'components/ProfileWithNickname';
import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import { myFriendApi } from 'utils/api';
import useSystemStore from 'stores/system';

// const user10: User = { uid: 10, nickname: '10번유저', profile: kleeImage };
// const user11: User = { uid: 11, nickname: '유저11', profile: testImage };
// const user12: User = { uid: 12, nickname: '12번유저', profile: kleeImage };
// const user13: User = { uid: 13, nickname: '13번유저', profile: testImage };
// const user14: User = { uid: 14, nickname: '유저 넘버14', profile: null };
// const user15: User = {
//   uid: 15,
//   nickname: '유저인데 15번임',
//   profile: kleeImage,
// };

// const dummyFollower = [
//   user10,
//   user11,
//   user13,
//   user15,
//   user10,
//   user11,
//   user13,
//   user15,
//   user10,
//   user11,
//   user13,
//   user15,
//   user14,
//   user10,
//   user11,
//   user14,
//   user10,
//   user11,
//   user14,
//   user10,
//   user11,
//   user14,
//   user10,
//   user11,
// ];
// const dummyFollowing = [
//   user10,
//   user11,
//   user12,
//   user14,
//   user10,
//   user11,
//   user13,
//   user15,
//   user11,
//   user13,
// ];

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
              {follower.length === 0 && '팔로워 중인 사람이 없습니다'}
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
