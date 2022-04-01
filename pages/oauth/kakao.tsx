import { useEffect } from 'react';
import { loginApi } from 'utils/api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'utils/statics';

const kakao = () => {
  let code = '';
  if (typeof window !== 'undefined') {
    code = new URL(window.location.href).searchParams.get('code');
  }

  const loginSequence = async (code: string) => {
    const { accessToken, refreshToken } = await loginApi(code);
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  };

  useEffect(() => {
    loginSequence(code);
    location.href = '/';
  });

  return (
    <div>
      <div>kakao 확인용</div>
      <div>{`code : ${code}`}</div>
    </div>
  );
};
export default kakao;
