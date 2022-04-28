import useColorStore from 'stores/color';

import React, { useEffect } from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import Trend from './Trend';
import Header from 'components/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Background = styled.div`
  width: 100%;
  height: 100%;
  min-width: 43.5rem;
  min-height: 100vh;
`;

//Header가 들어갈 부분
const HeaderDiv = styled.div`
  position: sticky;
  top: 0px;
  height: 3.5rem;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 4px 6px rgb(0, 0, 0, 0.05);
  z-index: 100;
`;

//Header를 제외한 전체
const BodyRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: calc(200vh - 3.5rem);
  width: 100%;
  padding-top: 0.5rem;
  background-color: ${(props) => props.color};
`;

//왼쪽 영역 전체
const LeftSide = styled.div`
  position: sticky;
  top: 4rem;
  display: inline-block;
  width: 13rem;
  height: calc(100vh - 4rem);
  padding: 0.5rem;
  background-color: ${(props) => props.color};
`;
//오른쪽 영역(창이 줄어들 경우 display:none)
const RightSide = styled.div`
  position: sticky;
  top: 4rem;
  display: inline-block;
  width: 13rem;
  height: calc(100vh - 4rem);
  padding: 0.5rem;
  @media screen and (max-width: 65rem) {
    display: none;
  }
  background-color: ${(props) => props.color};
`;
//content들이 들어갈 영역
const ContentSide = styled.div`
  display: inline-block;
  min-width: 30rem;
  width: calc(100vw - 27.5rem);
  min-height: calc(100vh - 4rem);
  height: 100%;
  margin: 0;
  padding: 0.5rem;
  @media screen and (max-width: 65rem) {
    width: calc(100vw - 14.5rem);
  }
`;
//창이 줄어듦에 따라 왼쪽에 보여지는 부분
const AppendArea = styled.div`
  display: none;
  width: 100%;
  @media screen and (max-width: 65rem) {
    display: inline-block;
  }
`;

const SideBox = styled.div`
  width: 12rem;
  margin-bottom: 0.5rem;
`;

const AppLayout = ({ children }: LayoutProps) => {
  // const { bodyColor, sideColor } = useColorStore((state) => state);
  const bodyColor = '#F7F0E6';
  const sideColor = '#F1F8E9';

  return (
    <Background>
      <HeaderDiv>
        <Header />
      </HeaderDiv>
      <BodyRow color={bodyColor}>
        <LeftSide color={sideColor}>
          <SideBox>
            <Navigation />
          </SideBox>
          <AppendArea>
            <SideBox>
              <Trend />
            </SideBox>
          </AppendArea>
        </LeftSide>
        <ContentSide>{children}</ContentSide>
        <RightSide color={sideColor}>
          <SideBox>
            <Trend />
          </SideBox>
        </RightSide>
      </BodyRow>
    </Background>
  );
};

export default AppLayout;
