import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import useUserStore from 'stores/user';
import useSystemStore from 'stores/system';
import Router from 'next/router';

import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
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

const Navigation = () => {
  const logoutAction = useUserStore((state) => state.logoutAction);
  const { startLoadingAction, endLoadingAction } = useSystemStore(
    (state) => state,
  );

  const onClickHome = () => {
    Router.push('/home');
  };
  const onClickReview = () => {
    Router.push('/review/new');
  };
  const onClickProfile = () => {
    Router.push('/member/profile');
  };
  const onClickSetting = () => {
    Router.push('/setting');
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
        <NavigationRow onClick={onClickHome}>
          <HomeIcon className="icon" sx={{ fontSize: 32 }} />홈
        </NavigationRow>
        <NavigationRow onClick={onClickReview}>
          <EditIcon className="icon" sx={{ fontSize: 32 }} />
          리뷰작성
        </NavigationRow>
        <NavigationRow onClick={onClickProfile}>
          <AccountBoxIcon className="icon" sx={{ fontSize: 32 }} />
          프로필
        </NavigationRow>
        <NavigationRow onClick={onClickSetting}>
          <SettingsIcon className="icon" sx={{ fontSize: 32 }} />
          설정
        </NavigationRow>
        <NavigationRow onClick={onClickLogout}>
          <LogoutIcon className="icon" sx={{ fontSize: 32 }} />
          로그아웃
        </NavigationRow>
      </NavigationWrapper>
    </>
  );
};

export default Navigation;
