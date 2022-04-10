import { Button } from 'antd';
import LogoutButton from 'components/LogoutButton';
import useUserStore from 'stores/user';
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_STORE } from 'utils/statics';

const Home = () => {
  const { nickname } = useUserStore((state) => state);

  const onClickTest = () => {
    console.log(nickname);
    console.log(localStorage.getItem(ACCESS_TOKEN));
    console.log(localStorage.getItem(REFRESH_TOKEN));
  };

  return (
    <div>
      <div>Home예정</div>
      <div>
        <Button onClick={onClickTest} type="primary">
          테스트용
        </Button>
        <div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Home;
