import KakaoLoginForm from 'components/KakaoLoginForm';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import useUserStore from 'stores/user';
import styled from 'styled-components';
import Router from 'next/router';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 2rem;
  padding-top: 5rem;
  padding-bottom: 5rem;
  width: auto;
  min-width: 500px;
  background-color: gray;
`;

const LeftSide = styled.div`
  background-color: red;
  width: 20rem;
`;

const RightSide = styled.div`
  background-color: blue;
  width: 20rem;
`;

const Logo = styled.img`
  width: 100%;
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
        <h2>
          Vamigo에서 전세계에 있는 친구, 가족, 지인들과 함께 리뷰를 나눠보세요.
        </h2>
      </LeftSide>

      <RightSide>
        <KakaoLoginForm />
      </RightSide>
    </Container>
  );
};

export default Index;
