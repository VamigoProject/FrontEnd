import { ProfileLayout, Empty } from 'components';
import { ResponsiveRadar } from '@nivo/radar';
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
  const myNickname = useUserStore((state) => state.nickname);
  const [targetId, setTargetId] = useState<number>(0);
  const [nickname, setNickname] = useState<string>('');
  const [profile, setProfile] = useState<string | null>('');
  const [introduce, setIntroduce] = useState<string>('');
  const [isFollower, setIsFollower] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const [individual, setIndividual] = useState<Array<any>>([]);

  const fetch = async (targetId: number) => {
    try {
      const { user, result } = await memberStatisticsApi(
        uid!,
        targetId,
        myNickname!,
      );

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
        <Empty message="????????? ??? ???????????? ???????????? ????????????" />
      )}
      {individual.length !== 0 && (
        <IndividualStatistics>
          <ContentBox padding="1rem">
            <h3 style={{ margin: '0' }}>?????? ??????</h3>
            <ResponsiveRadar
              data={individual}
              keys={[myNickname!, nickname!]}
              margin={{ top: 30, right: 20, bottom: 50, left: 20 }}
              indexBy="category"
              legends={[
                {
                  anchor: 'top-left',
                  direction: 'column',
                  translateX: 0,
                  translateY: -10,
                  itemWidth: 80,
                  itemHeight: 20,
                  itemTextColor: '#999',
                  symbolSize: 12,
                  symbolShape: 'circle',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemTextColor: '#000',
                      },
                    },
                  ],
                },
              ]}
            />
          </ContentBox>
        </IndividualStatistics>
      )}
    </ProfileLayout>
  );
};

export default statistics;
