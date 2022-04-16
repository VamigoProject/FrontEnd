import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import {
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const GlobalStyle = createGlobalStyle`
  .icon{
    font-size: 1.5rem;
  }
`;

const NavigationWrapper = styled.div`
  width: 100%;
  height: 20rem;
  padding: 0.75rem;
  background-color: ${(props) => props.theme.colors.ground()};
`;

const NavigationRow = styled.div`
  margin-bottom: 0.25rem;
`;

const Navigation = () => {
  return (
    <>
      <GlobalStyle />
      <NavigationWrapper>
        <NavigationRow>
          <HomeOutlined className="icon" />홈
        </NavigationRow>
        <NavigationRow>
          <SettingOutlined className="icon" />
          설정
        </NavigationRow>
        <NavigationRow>
          <LogoutOutlined className="icon" />
          로그아웃
        </NavigationRow>
      </NavigationWrapper>
    </>
  );
};

export default Navigation;
