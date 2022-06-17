import { useUserStore } from 'stores';
import { useRouter } from 'next/router';
import { ProfileLayout } from 'components';
import { NextPageContext } from 'next';
import { useEffect } from 'react';

interface MemberTypes {
  user: {
    targetId: number;
    nickname: string;
    profile: string | null;
    introduce: string;
  };
}

const member = ({ user }: MemberTypes) => {
  const { uid } = useUserStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    if (
      typeof router.query.targetId === 'string' &&
      uid === parseInt(router.query.targetId)
    ) {
      router.replace(`/member/profile`);
    }
  }, [router.isReady, router.query.targetID]);

  return (
    <ProfileLayout
      targetId={user.targetId}
      nickname={user.nickname}
      profile={user.profile}
      introduce={user.introduce}
    />
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { targetId } = context.query;

  const user = {
    targetId: targetId,
    nickname: `테스트 닉네임 - ${targetId}`,
    profile: null,
    introduce: '테스트용 자기소개',
  };

  return { props: { user } };
}

export default member;
