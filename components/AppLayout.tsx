import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import Trend from './Trend';
import Header from 'components/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Background = styled.div`
  width: 100%;
  min-height: calc(100vh + 1rem);
  background-color: ${(props) => props.color};
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
  min-height: calc(100vh - 3.5rem);
  width: 100%;
`;

//왼쪽 영역 전체
const LeftSide = styled.div`
  position: fixed;
  top: 3.5rem;
  width: 16rem;
  height: calc(100vh - 3.5rem);
  padding: 0.5rem;
  background-color: ${(props) => props.color};
`;
//오른쪽 영역(창이 줄어들 경우 display:none)
const RightSide = styled.div`
  position: fixed;
  right: 0;
  top: 3.5rem;
  width: 16rem;
  height: calc(100vh - 3.5rem);
  padding: 0.5rem;
  @media screen and (max-width: 65rem) {
    display: none;
  }
  background-color: ${(props) => props.color};
`;
//content들이 들어갈 영역
const ContentSide = styled.div`
  position: absolute;
  left: 16rem;
  width: calc(100vw - 33rem);
  min-height: calc(100vh - 3.5rem);
  padding: 0.5rem;
  @media screen and (max-width: 65rem) {
    width: calc(100vw - 17rem);
  }
  background-color: ${(props) => props.color};
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
  width: 15rem;
  margin-bottom: 0.5rem;
`;

const AppLayout = ({ children }: LayoutProps) => {
  // const { bodyColor, sideColor } = useColorStore((state) => state);
  const bodyColor = '#F7F0E6';
  const sideColor = '#F1F8E9';

  return (
    <Background color={bodyColor}>
      <HeaderDiv>
        <Header />
      </HeaderDiv>
      <BodyRow>
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
        <ContentSide color={bodyColor}>{children}</ContentSide>
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
