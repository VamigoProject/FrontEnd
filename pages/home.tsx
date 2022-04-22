import useUserStore from 'stores/user';
import styled from 'styled-components';
import Empty from 'components/Empty';
import { Review } from 'utils/types';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: blue;
`;

const Reviews: Array<Review> = [{}];

const Home = () => {
  const { nickname, accessToken, refreshToken } = useUserStore(
    (state) => state,
  );

  return (
    <Background>
      {Reviews.length === 0 && <Empty></Empty>}
      {Reviews.length !== 0 && Reviews.map((review) => <div>리뷰</div>)}
    </Background>
  );
};

export default Home;
