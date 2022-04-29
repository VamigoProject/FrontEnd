import { Avatar } from '@mui/material';
import { green } from '@mui/material/colors';

interface Props {
  nickname: string;
  profile: string | null;
  size: 'small' | 'medium' | 'large';
}

const ProfileAvatar = ({ nickname, profile, size = 'medium' }: Props) => {
  const small = { width: 24, height: 24 };
  const medium = { width: 30, height: 30 };
  const large = { width: 36, height: 36 };

  let sizeObject;
  if (size === 'small') sizeObject = small;
  else if (size === 'medium') sizeObject = medium;
  else if (size === 'large') sizeObject = large;

  if (nickname === null) {
    nickname = 'Nickname';
  }
  if (profile === null) {
    return (
      <>
        <Avatar sx={Object.assign(sizeObject, { bgcolor: green[500] })}>
          {nickname.slice(0, 1)}
        </Avatar>
      </>
    );
  } else {
    return (
      <>
        <Avatar src={`data:image/png;base64, ${profile}`} />
      </>
    );
  }
};

export default ProfileAvatar;
