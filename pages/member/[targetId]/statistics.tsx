import { ProfileLayout, Empty } from 'components';
import { ResponsivePie } from '@nivo/pie';
import { ContentBox } from 'components';
import { useUserStore } from 'stores';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { memberStatisticsApi } from 'utils/api';
import styled from 'styled-components';

const IndividualStatistics = styled.div`
  width: 100%;
  height: 20rem;
`;

const statistics = () => {
  const router = useRouter();

  const { uid } = useUserStore((state) => state);
  const [targetId, setTargetId] = useState<number>(0);
  const [nickname, setNickname] = useState<string>('');
  const [profile, setProfile] = useState<string | null>('');
  const [introduce, setIntroduce] = useState<string>('');
  const [isFollower, setIsFollower] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const [individual, setIndividual] = useState<Array<IndividualStatistics>>([]);

  const fetch = async (targetId: number) => {
    try {
      const { user, result } = await memberStatisticsApi(uid!, targetId);

      setNickname(user.nickname);
      setProfile(user.profile);
      setIntroduce(user.introduce);
      setIsFollower(user.isFollower);
      setIsFollowing(user.isFollowing);
      setTargetId(targetId);

      setIndividual(result);
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
      current={3}
    >
      {individual.length === 0 && (
        <Empty message="통계를 낼 데이터가 존재하지 않습니다" />
      )}
      {individual.length !== 0 && (
        <IndividualStatistics>
          <ContentBox padding="1rem">
            <h3 style={{ margin: '0' }}>개인 통계</h3>
            <ResponsivePie
              data={individual}
              margin={{ top: 20, right: 20, bottom: 50, left: 20 }}
              sortByValue={true}
              innerRadius={0.05}
              padAngle={1}
              cornerRadius={2}
            />
          </ContentBox>
        </IndividualStatistics>
      )}
    </ProfileLayout>
  );
};

export default statistics;
