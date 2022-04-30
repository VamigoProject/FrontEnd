import React from 'react';
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
`;

const Background = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 100000;

  display: flex;
  justify-content: center;
  align-items: center;
`;

interface BoxProps {
  width: string;
  height: string;
}

const Box = styled.div<BoxProps>`
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), 0 3px 8px rgba(0, 0, 0, 0.4);
  background-color: white;
  animation: popup 0.5s;
  animation-timing-function: ease-in-out;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

interface Props {
  children?: React.ReactNode;
  onClose: () => void;
  width?: string;
  height?: string;
}

const Dialog = ({
  children,
  onClose,
  width = '100%',
  height = '100%',
}: Props) => {
  return (
    <>
      <Background onClick={onClose}>
        <Box width={width} height={height}>
          {children}asdfasdf
          <br />
          asdfasdfsdaf
        </Box>
      </Background>
      <GlobalStyle />
    </>
  );
};

export default Dialog;
