import type { NextPage } from 'next';
import { useEffect } from 'react';
import useUserStore from 'stores/user';
import styled from 'styled-components';
import Router from 'next/router';
import LoginForm from 'components/LoginForm';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 2rem;
  width: auto;
  min-height: 35rem;
  background-color: rgb(180, 180, 180);
  justify-content: center;
  align-items: center;
  gap: 2rem 7rem;
`;

const LeftSide = styled.div`
  width: 23rem;
`;

const Logo = styled.img`
  width: 15rem;
  margin: 0 auto;
`;

const RightSide = styled.div`
  display: flex;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgb(0, 0, 0, 0.1);
  border-radius: 8px;
  height: 14rem;
  width: 23rem;
  flex-direction: col;
  justify-content: center;
  align-items: center;
`;

const Index: NextPage = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      Router.push('/home');
    }
  });

  return (
    <Container>
      <LeftSide>
        <Logo src={'/logo.png'} />
        <h2>Vamigo에서 리뷰를 나눠 보세요</h2>
      </LeftSide>

      <RightSide>
        {/* <KakaoLoginForm /> */}
        <LoginForm />
      </RightSide>
    </Container>
  );
};

export default Index;
