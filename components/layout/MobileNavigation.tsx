import React from 'react';
import styled from 'styled-components';
import { Navigation } from 'components/layout';

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
  }
`;

const LeftSide = styled.div`
  width: 40%;
  height: 100%;
  padding-top: 1rem;
  background-color: #f1f8e9;
`;

interface MobileNavigationTypes {
  handler: (e: boolean) => void;
}

const MobileNavigation = ({ handler }: MobileNavigationTypes) => {
  return (
    <FullPage onClick={() => handler(false)}>
      <LeftSide onClick={(e) => e.stopPropagation()}>
        <Navigation handler={handler} />
      </LeftSide>
    </FullPage>
  );
};

export default MobileNavigation;
