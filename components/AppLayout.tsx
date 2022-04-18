import ColorPicker from 'material-ui-color-picker';
import useInput from 'hooks/useInput';

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
  height: 100%;
  min-width: 43.5rem;
  min-height: 100vh;
`;

const HeaderDiv = styled.div`
  position: sticky;
  top: 0px;
  height: 3.5rem;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 4px 6px rgb(0, 0, 0, 0.05);
  z-index: 100;
`;

const BodyRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: calc(200vh - 3.5rem);
  width: 100%;
  padding-top: 0.5rem;
  background-color: ${(props) => props.color};
`;

const LeftSide = styled.div`
  position: sticky;
  top: 4rem;
  display: inline-block;
  width: 13rem;
  height: calc(100vh - 4rem);
  padding: 0.5rem;
  background-color: ${(props) => props.color};
`;
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

const ContentSide = styled.div`
  display: inline-block;
  min-width: 30rem;
  width: calc(100vw - 27rem);
  height: 100%;
  margin: 0;
  padding: 0.5rem;
  @media screen and (max-width: 65rem) {
    width: calc(100vw - 14rem);
  }
`;

const AppendArea = styled.div`
  display: none;
  width: 100%;
  @media screen and (max-width: 65rem) {
    display: inline-block;
  }
`;

const SideBox = styled.div`
  width: 12rem;
  height: 100%;
  margin-bottom: 0.5rem;
`;

const TestColor = styled.div`
  width: 100%;
  height: 5rem;
  border: 1px solid black;
`;

const AppLayout = ({ children }: LayoutProps) => {
  const [bodyColor, onChangeBodyColor] = useInput('#F1E9DE');
  const [sideColor, onChangeSideColor] = useInput('#f1f8e9');

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
        <ContentSide>
          <TestColor>
            <ColorPicker
              label="background색깔"
              name="body"
              value={bodyColor}
              onChange={(e) => onChangeBodyColor(e)}
            />
            <ColorPicker
              label="side색깔"
              name="sidebox"
              value={sideColor}
              onChange={(e) => onChangeSideColor(e)}
            />
          </TestColor>
          {children}
        </ContentSide>
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
