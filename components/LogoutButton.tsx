import useUserStore from 'stores/user';
import MyButton from './commonComponents/MyButton';

const LogoutButton = () => {
  const logoutAction = useUserStore((state) => state.logoutAction);

  const onClickLogout = () => {
    logoutAction();
    location.href = '/';
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
