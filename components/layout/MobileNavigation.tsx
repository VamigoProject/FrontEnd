import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Navigation } from 'components/layout';
import { keyframes } from 'styled-components';

const FullPage = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: none;
  @media screen and (max-width: 600px) {
    display: block;
  } ;
`;

interface LeftSideProps {
  animation: ReturnType<typeof keyframes>;
}

const LeftSide = styled.div<LeftSideProps>`
  width: 15rem;
  height: 100%;
  padding-top: 1rem;
  padding-left: 0.5rem;
  background-color: #f1f8e9;
  animation: ${(props) => props.animation} 0.25s ease-in-out 0s 1 normal;
`;

//켜질때 Animation
const PopUp = keyframes`
  from{
    transform: translate(-100%, 0%);
  }
  to{
    transform: translate(0%, 0%);
  }
`;

//꺼질때 Animation
const PopDown = keyframes`
  from{
    transform: translate(0%, 0%);
  }
  to{
    transform: translate(-100%, 0%);
  }
`;

interface MobileNavigationTypes {
  handler: (e: boolean) => void;
  isOpen: boolean;
}

const MobileNavigation = ({ handler, isOpen }: MobileNavigationTypes) => {
  const [animation, setAnimation] =
    useState<ReturnType<typeof keyframes>>(PopDown);

  useEffect(() => {
    if (animation === PopDown) {
      setAnimation(PopUp);
    }
  }, [isOpen]);

  const onClose = useCallback(() => {
    setTimeout(() => {
      handler(false);
    }, 200);
    setAnimation(PopDown);
  }, []);

  return (
    <>
      {isOpen && (
        <FullPage onClick={onClose}>
          <LeftSide onClick={(e) => e.stopPropagation()} animation={animation}>
            <Navigation handler={handler} />
          </LeftSide>
        </FullPage>
      )}
    </>
  );
};

export default MobileNavigation;
