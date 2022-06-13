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

const Background = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.1);
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
  max-width: 100vw;
  max-height: 100vh;
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
  width: string;
  height: string;
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
      <Background onClick={closeFunction}>
        <Box
          className={animation}
          width={width}
          height={height}
          title={title}
          onClick={(e) => e.stopPropagation()}
        >
          {title && <Title>{title}</Title>}
          <Line />
          <Wrapper>{children}</Wrapper>
        </Box>
      </Background>
      <GlobalStyle />
    </>
  );
};

export default Dialog;
