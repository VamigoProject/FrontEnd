import { useUserStore } from 'stores';
import { useRouter } from 'next/router';
import { ProfileLayout } from 'components/layout';
import { useEffect, useState, useRef } from 'react';
import { memberProfileApi } from 'utils/api';

const member = () => {
  const router = useRouter();

  const { uid } = useUserStore((state) => state);
  const [targetId, setTargetId] = useState<number>(0);
  const [nickname, setNickname] = useState<string>('');
  const [profile, setProfile] = useState<string | null>('');
  const [introduce, setIntroduce] = useState<string>('');
  const [isFollower, setIsFollower] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const fetch = async (targetId: number) => {
    try {
      const response = await memberProfileApi(uid!, targetId);
      setNickname(response.nickname);
      setProfile(response.profile);
      setIntroduce(response.introduce);
      setIsFollower(response.isFollower);
      setIsFollowing(response.isFollowing);
      setTargetId(targetId);
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
    />
  );
};

export default member;
