import { Avatar } from '@mui/material';
import { green } from '@mui/material/colors';

interface Props {
  nickname: string;
  profile: string | null;
}

const ProfileAvatar = ({ nickname, profile }: Props) => {
  if (nickname === null) {
    nickname = 'Nickname';
  }
  if (profile === null) {
    return (
      <>
        <Avatar sx={{ bgcolor: green[500] }}>{nickname.slice(0, 1)}</Avatar>
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
