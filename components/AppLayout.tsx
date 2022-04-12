import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import Navigation from './Navigation';
import Trend from './Trend';

interface LayoutProps {
  children: React.ReactNode;
}

const Background = styled.div`
  width: 100%;
  height: 100%;
  min-width: 43.5rem;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;

const HeaderDiv = styled.div`
  position: sticky;
  top: 0px;
  height: 3.5rem;
  width: 100%;
  background-color: ${(props) => props.theme.colors.ground()};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 4px 6px rgb(0, 0, 0, 0.05);
  z-index: 100;
`;

const BodyRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: calc(200vh - 3.5rem);
  width: 100%;
  padding-top: 1rem;
  background-color: ${(props) => props.theme.colors.background()};
`;

const SideBox = styled.div`
  display: inline-block;
  width: 12.5rem;
  height: 100%;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: red;
`;

const LeftSide = styled(SideBox)`
  position: sticky;
  top: 4.5rem;
`;

const LeftBottomSide = styled.div`
  display: none;
  position: sticky;
  top: 30.5rem;
  width: 100%;
  @media screen and (max-width: 58rem) {
    display: inline-block;
  }
`;

const RightSide = styled(SideBox)`
  position: sticky;
  top: 4.5rem;
  @media screen and (max-width: 58rem) {
    display: none;
  }
`;

const ContentSide = styled.div`
  display: inline-block;
  padding: 0.5rem;
  min-width: 30rem;
  width: calc(100vw - 28.25rem);
  height: 100%;

  @media screen and (max-width: 58rem) {
    width: calc(100vw - 15.5rem);
  }
`;

const AppLayout = ({ children }: LayoutProps) => {
  return (
    <Background>
      <HeaderDiv>안녕하세요</HeaderDiv>
      <BodyRow>
        <LeftSide>
          <Navigation />
          <LeftBottomSide>
            <Trend />
          </LeftBottomSide>
        </LeftSide>
        <ContentSide>{children}</ContentSide>
        <RightSide>
          <Trend />
        </RightSide>

        {/* <Col span={18} md={14} xl={16} xxl={18}>
          {children}
        </Col> */}
      </BodyRow>
    </Background>
  );
};

export default AppLayout;
