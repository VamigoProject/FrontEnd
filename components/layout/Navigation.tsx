import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import useUserStore from 'stores/user';
import useSystemStore from 'stores/system';
import Router from 'next/router';

import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const GlobalStyle = createGlobalStyle`
  .icon{
    margin-right: 0.5rem;
  }
`;

const NavigationWrapper = styled.div`
  width: 100%;
  height: 20rem;
`;

const NavigationRow = styled.div`
  display: flex;
  align-items: center;
  padding: 0.25rem;
  margin-bottom: 0.25rem;
  border-radius: 0.1rem;

  transition-property: background-color;
  transition-duration: 0.15s;
  transition-timing-function: ease-out;
  &:hover {
    transition-property: background-color;
    transition-duration: 0.25s;
    transition-timing-function: ease-out;
    cursor: pointer;
    background-color: rgb(0, 0, 0, 0.1);
  }
`;

const TrendNavigation = styled.div`
  display: none;
  align-items: center;
  padding: 0.25rem;
  margin-bottom: 0.25rem;
  border-radius: 0.1rem;

  transition-property: background-color;
  transition-duration: 0.15s;
  transition-timing-function: ease-out;
  &:hover {
    transition-property: background-color;
    transition-duration: 0.25s;
    transition-timing-function: ease-out;
    cursor: pointer;
    background-color: rgb(0, 0, 0, 0.1);
  }
  @media screen and (max-width: 600px) {
    display: flex;
  }
`;

interface NavigationTypes {
  handler?: (e: boolean) => void;
}

const Navigation = ({ handler }: NavigationTypes) => {
  const logoutAction = useUserStore((state) => state.logoutAction);
  const { startLoadingAction, endLoadingAction } = useSystemStore(
    (state) => state,
  );
  const closeMobileNavigation = () => {
    handler ? handler(false) : null;
  };

  const onClick = (path: string) => {
    Router.push(path);
    closeMobileNavigation();
  };

  const onClickLogout = async () => {
    startLoadingAction();
    await logoutAction();
    endLoadingAction();
    location.href = '/';
  };

  return (
    <>
      <GlobalStyle />
      <NavigationWrapper>
        <NavigationRow onClick={() => onClick('/home')}>
          <HomeIcon className="icon" sx={{ fontSize: 32 }} />
          <strong>???</strong>
        </NavigationRow>
        <NavigationRow onClick={() => onClick('/review/new')}>
          <EditIcon className="icon" sx={{ fontSize: 32 }} />
          <strong>????????????</strong>
        </NavigationRow>
        <NavigationRow onClick={() => onClick('/member/profile')}>
          <AccountBoxIcon className="icon" sx={{ fontSize: 32 }} />
          <strong>?????????</strong>
        </NavigationRow>
        <TrendNavigation onClick={() => onClick('/trend')}>
          <TrendingUpIcon className="icon" sx={{ fontSize: 32 }} />
          <strong>?????????</strong>
        </TrendNavigation>
        <NavigationRow onClick={() => onClick('/setting')}>
          <SettingsIcon className="icon" sx={{ fontSize: 32 }} />
          <strong>??????</strong>
        </NavigationRow>
        <NavigationRow onClick={onClickLogout}>
          <LogoutIcon className="icon" sx={{ fontSize: 32 }} />
          <strong>????????????</strong>
        </NavigationRow>
      </NavigationWrapper>
    </>
  );
};

export default Navigation;
