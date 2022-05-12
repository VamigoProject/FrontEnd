/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSystemStore from 'stores/system';
import useUserStore from 'stores/user';
import { searchMemberApi, followApi, unfollowApi } from 'utils/api';
import ContentBox from 'components/ContentBox';
import styled from 'styled-components';
import ProfileWithNickname from 'components/ProfileWithNickname';
import { Button } from '@mui/material';

const MemberWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.5rem;
`;

const search = () => {
  const { startLoadingAction, endLoadingAction } = useSystemStore(
    (state) => state,
  );
  const myUid = useUserStore((state) => state.uid);
  const router = useRouter();
  const [isQueryEmpty, setIsQueryEmpty] = useState<boolean>(false);
  const [memberList, setMemberList] = useState([]);

  const fetch = async () => {
    startLoadingAction();
    try {
      const response = await searchMemberApi(myUid, router.query.nickname!);
      setMemberList(response);
    } catch (error) {
      alert(error);
    }
    endLoadingAction();
  };

  useEffect(() => {
    if (!router.isReady) return;

    if (router.query.nickname === undefined || router.query.nickname === '') {
      setIsQueryEmpty(true);
    } else {
      fetch();
    }
  }, [router.isReady, router.query.nickname]);

  const onClickFollow = async (e, myUid: number, targetUid: number) => {
    e.preventDefault();
    try {
      await followApi(myUid, targetUid);
      const afterMember: Array<any> = [...memberList];
      afterMember.find((member: any) => member.uid === targetUid).isFollowing =
        true;
      setMemberList(afterMember);
      alert('팔로우하였습니다');
    } catch (error) {
      alert(error);
    }
  };

  const onClickUnfollow = async (e, myUid: number, targetUid: number) => {
    e.preventDefault();
    try {
      await unfollowApi(myUid, targetUid);
      const afterMember: Array<any> = [...memberList];
      afterMember.find((member: any) => member.uid === targetUid).isFollowing =
        false;
      setMemberList(afterMember);
      alert('언팔로우하였습니다');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ContentBox padding="1rem">
      {isQueryEmpty && <div>검색어가 없습니다, 다시 검색해주세요</div>}
      {!isQueryEmpty &&
        memberList.map((member) => (
          <MemberWrapper key={JSON.stringify(member)}>
            <ProfileWrapper>
              <ProfileWithNickname
                nickname={member.nickname}
                profile={member.profile}
                size="medium"
              />
              {member.isFollower && '당신을 팔로우하고 있습니다'}
            </ProfileWrapper>
            <div>
              {member.isFollowing && (
                <Button
                  variant="outlined"
                  sx={{
                    width: '4.5rem',
                    fontSize: '0.8rem',
                    padding: '0.2rem',
                  }}
                  onClick={(e) => onClickUnfollow(e, myUid, member.uid)}
                >
                  언팔로우
                </Button>
              )}
              {!member.isFollowing && (
                <Button
                  variant="contained"
                  sx={{
                    width: '4.5rem',
                    fontSize: '0.8rem',
                    padding: '0.2rem',
                  }}
                  onClick={(e) => onClickFollow(e, myUid, member.uid)}
                >
                  팔로우
                </Button>
              )}
            </div>
          </MemberWrapper>
        ))}
      {!isQueryEmpty && memberList.length === 0 && (
        <div>검색결과가 없습니다</div>
      )}
    </ContentBox>
  );
};

export default search;