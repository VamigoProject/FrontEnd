import { useEffect } from 'react';
import { loginApi } from 'utils/api';
import useUserStore from '../../stores/user';
import Router from 'next/router';

const kakao = () => {
  const loginAction = useUserStore((state) => state.loginAction);

  const loginSequence = async () => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code === null || code === '' || code === undefined) {
      alert('코드가 존재하지 않습니다');
      return;
    } else {
      try {
        const { isJoined, nickname, accessToken, refreshToken } =
          await loginApi(code.toString());
        if (isJoined) {
          loginAction(nickname, accessToken, refreshToken);
        } else {
          Router.push('/member/signup');
        }
      } catch (err) {
        alert(`Error ${err}`);
      }
    }
  };

  useEffect(() => {
    loginSequence();
    location.href = '/home';
  }, []);

  return (
    <div>
      <div>kakao 확인용</div>
    </div>
  );
};
export default kakao;
