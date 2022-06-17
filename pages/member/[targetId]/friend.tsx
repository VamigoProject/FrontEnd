import { ProfileLayout } from 'components';
import { NextPageContext } from 'next';

interface FriendTypes {
  user: {
    targetId: number;
    nickname: string;
    profile: string | null;
    introduce: string;
  };
}

const friend = ({ user }: FriendTypes) => {
  return (
    <ProfileLayout
      targetId={user.targetId}
      nickname={user.nickname}
      profile={user.profile}
      introduce={user.introduce}
    >
      <div>상대방 친구</div>
    </ProfileLayout>
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

export default friend;
