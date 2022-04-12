import { Button } from 'antd';
import LogoutButton from 'components/LogoutButton';
import useUserStore from 'stores/user';
import styled from 'styled-components';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: blue;
`;

const Home = () => {
  const { nickname, accessToken, refreshToken } = useUserStore(
    (state) => state,
  );

  const onClickTest = () => {
    console.log(nickname);
    console.log(accessToken);
    console.log(refreshToken);
  };

  return (
    <Background>
      <div>Home예정</div>
      <div>
        <Button onClick={onClickTest} type="primary">
          테스트용
        </Button>
        <div>
          <LogoutButton />
        </div>
      </div>
    </Background>
  );
};

export default Home;
