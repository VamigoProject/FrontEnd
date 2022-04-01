import { ACCESS_TOKEN, REFRESH_TOKEN } from 'utils/statics';
import MyButton from './commonComponents/MyButton';

const LogoutButton = () => {
  const onClickLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    alert('성공적으로 로그아웃 하였습니다.');
  };

  return (
    <>
      <MyButton size="medium" primary={false} onClick={onClickLogout}>
        로그아웃
      </MyButton>
    </>
  );
};

export default LogoutButton;
