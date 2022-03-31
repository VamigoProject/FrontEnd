import KakaoLoginForm from 'components/KakaoLoginForm';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div>
      <div>로그인 안되 있을 경우 로그인창</div>
      <KakaoLoginForm />
    </div>
  );
};

export default Home;
