import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @keyframes popup{
    from{
      opacity: 0;
      transform: scale(0, 0);
    }
    to{
      opacity: 1;
      transform: scale(1, 1);
    }
  }
  @keyframes popdown{
    from{
      opacity: 1;
      transform: scale(1, 1);
    }
    to{
      opacity: 0;
      transform: scale(0, 0);
    }
  }
  &.openPopup{
    animation: popup 0.5s ease-in-out 0s 1 normal forwards;
  }
  &.closePopup{
    animation: popdown 0.25s ease-in-out 0s 1 normal forwards;
  }
`;

interface BackgroundProps {
  width: string;
  height: string;
}
const Background = styled.div<BackgroundProps>`
  position: fixed;
  display: grid;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 100000;
  grid-template-columns: calc(50vw - ${(props) => props.width} / 2) ${(props) =>
      props.width} calc(50vw - ${(props) => props.width} / 2);
  grid-template-rows: calc(50vh - ${(props) => props.height} / 2) ${(props) =>
      props.height} calc(50vh - ${(props) => props.height} / 2);
`;

const LeftUp = styled.div`
  grid-column: 1;
  grid-row: 1;
`;
const CenterUp = styled.div`
  grid-column: 2;
  grid-row: 1;
`;
const RightUp = styled.div`
  grid-column: 3;
  gird-row: 1;
`;
const LeftCenter = styled.div`
  grid-column: 1;
  gird-row: 2;
`;
const CenterCenter = styled.div`
  grid-column: 2;
  grid-row: 2;
`;
const RightCenter = styled.div`
  grid-column: 3;
  grid-row: 2;
`;
const LeftBottom = styled.div`
  grid-column: 1;
  gird-row: 3;
`;
const CenterBottom = styled.div`
  grid-column: 2;
  grid-row: 3;
`;
const RightBottom = styled.div`
  grid-column: 3;
  grid-row: 3;
`;
interface BoxProps {
  width: string;
  height: string;
}

const Box = styled.div<BoxProps>`
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), 0 3px 8px rgba(0, 0, 0, 0.4);
  background-color: white;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const Title = styled.h2`
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin: 0;
`;

const Line = styled.div`
  width: calc(100% - 1rem);
  height: 2px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  margin-bottom: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

interface Props {
  children?: React.ReactNode;
  onClose: () => void;
  width: string | '10rem' | '100px';
  height: string | '10rem' | '100px';
  title?: string;
}

const Dialog = ({ children, onClose, width, height, title = '' }: Props) => {
  const [animation, setAnimation] = useState('openPopup');
  const closeFunction = () => {
    setAnimation('closePopup');
    setTimeout(onClose, 250);
  };

  return (
    <>
      <Background width={width} height={height}>
        <LeftUp onClick={closeFunction}></LeftUp>
        <CenterUp onClick={closeFunction}></CenterUp>
        <RightUp onClick={closeFunction}></RightUp>
        <LeftCenter onClick={closeFunction}></LeftCenter>
        <CenterCenter>
          <Box
            className={animation}
            width={width}
            height={height}
            title={title}
          >
            {title && <Title>{title}</Title>}
            <Line />
            <Wrapper>{children}</Wrapper>
          </Box>
        </CenterCenter>
        <RightCenter onClick={closeFunction}></RightCenter>
        <LeftBottom onClick={closeFunction}></LeftBottom>
        <CenterBottom onClick={closeFunction}></CenterBottom>
        <RightBottom onClick={closeFunction}></RightBottom>
      </Background>
      <GlobalStyle />
    </>
  );
};

export default Dialog;
