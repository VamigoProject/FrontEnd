import React, { useState } from 'react';
import styled from 'styled-components';
import { Header, Navigation, Trend, MobileNavigation } from 'components/layout';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

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
  position: fixed;
  top: 0px;
  height: 3.5rem;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 4px 6px rgb(0, 0, 0, 0.05);
  background-color: ${(props) => props.color};
  z-index: 100;

  display: flex;
  align-items: center;
  padding: 1rem;
`;

//Header를 제외한 전체
const BodyRow = styled.div`
  position: relative;
  display: flex;
  top: 3.5rem;
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
  @media screen and (max-width: 600px) {
    display: none;
  }
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
  @media screen and (max-width: 600px) {
    left: 0;
    width: calc(100vw - 0.5rem);
  }
  background-color: ${(props) => props.color};
  overflow: hidden;
`;
//창이 줄어듦에 따라 왼쪽에 보여지는 부분
const AppendArea = styled.div`
  display: none;
  width: 100%;
  @media screen and (max-width: 65rem) {
    display: inline-block;
  }
`;

//모바일 화면 시 더보기 메뉴 표출
const MobileArea = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: none;
  @media screen and (max-width: 600px) {
    display: flex;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
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
  const headerColor = '#4CAF50';

  const [isMobileNavigationOpen, setIsMobileNavigationOpen] =
    useState<boolean>(false);

  const onClickMobile = () => {
    setIsMobileNavigationOpen(true);
  };

  return (
    <Background color={bodyColor}>
      <MobileNavigation
        handler={setIsMobileNavigationOpen}
        isOpen={isMobileNavigationOpen}
      />
      <HeaderDiv color={headerColor}>
        <MobileArea onClick={onClickMobile}>
          <DensityMediumIcon style={{ width: '2rem', height: '2rem' }} />
        </MobileArea>
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
