import styled from 'styled-components';
import ProfileAvatar from 'components/ProfileAvatar';

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 15rem;
  height: 3rem;
  margin-bottom: 0.5rem;
`;

interface Props {
  nickname: string;
  profile: string | null;
}

const ProfileWithNickname = ({ nickname, profile }: Props) => {
  return (
    <ProfileWrapper>
      <ProfileAvatar nickname={nickname!} profile={profile} />
      <span style={{ marginLeft: '0.5rem' }}>{nickname}</span>
    </ProfileWrapper>
  );
};

export default ProfileWithNickname;
