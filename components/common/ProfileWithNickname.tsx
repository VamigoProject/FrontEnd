import styled from 'styled-components';
import ProfileAvatar from 'components/common/ProfileAvatar';

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 15rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
`;

interface Props {
  nickname: string;
  profile: string | null;
  size: 'small' | 'medium' | 'large';
}

const ProfileWithNickname = ({ nickname, profile, size = 'medium' }: Props) => {
  let fontSize;
  if (size === 'small') fontSize = '0.75rem';
  else if (size === 'medium') fontSize = '1rem';
  else if (size === 'large') fontSize = '1.25rem';

  return (
    <ProfileWrapper>
      <ProfileAvatar nickname={nickname!} profile={profile} size={size} />
      <span style={{ marginLeft: '0.5rem', fontSize: fontSize }}>
        {nickname}
      </span>
    </ProfileWrapper>
  );
};

export default ProfileWithNickname;
