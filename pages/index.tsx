import MyButton from 'components/commonComponents/MyButton';
import KakaoLoginForm from 'components/KakaoLoginForm';
import LogoutButton from 'components/LogoutButton';
import type { NextPage } from 'next';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'utils/statics';

const Home: NextPage = () => {
  const onClickTest = () => {
    console.log(localStorage.getItem(ACCESS_TOKEN));
    console.log(localStorage.getItem(REFRESH_TOKEN));
  };

  return (
    <div style={{ marginLeft: '10px' }}>
      <div>로그인 안되 있을 경우 로그인창</div>
      <br />
      <div>
        <KakaoLoginForm />
      </div>
      <br />
      <div>
        <LogoutButton />
      </div>
      <br />
      <div>
        <MyButton size="large" onClick={onClickTest}>
          console찍기
        </MyButton>
      </div>
    </div>
  );
};

export default Home;
