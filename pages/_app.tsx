import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import * as mui from '@mui/material/styles';
import {
  useSystemStore,
  useUserStore,
  useTrendStore,
  createUserStore,
} from 'stores';
import { lightTheme, darkTheme } from 'styles/muiTheme';
import { light, dark } from 'styles/theme';
import React, { useEffect, useState } from 'react';
import { Loading } from 'components';
import { AppLayout, FullPageLoading } from 'components/layout';
import { useRouter } from 'next/router';
import createContext from 'zustand/context';

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const { Provider: Provider1, useStore: userStore } = createContext();

  const router = useRouter();
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);

  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const { setTrend } = useTrendStore((state) => state);

  const { themeMode, isLoading } = useSystemStore((state) => state);
  const styledtheme = themeMode === 'light' ? light : dark;
  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  const publicPath: Array<string> = [
    '/',
    '/member/signup',
    '/member/password',
    '/member/mailauth',
  ];

  const withoutAppLayoutPath: Array<string> = [
    '/',
    '/member/signup',
    '/member/password',
    '/member/mailauth',
    '/404',
  ];

  const isPrivate = publicPath.indexOf(router.pathname) === -1;

  useEffect(() => {
    if (!isAppLoading && isPrivate && !isLoggedIn) router.push('/');
    if (!isAppLoading && !isPrivate && isLoggedIn) router.push('/home');
    setIsAppLoading(false);
    setTrend([]);
  }, [isAppLoading, isPrivate, isLoggedIn]);

  const CommonLayout = (children: React.ReactNode) => {
    return (
      <>
        {/* <Provider1 createStore={createUserStore}> */}
        <mui.ThemeProvider theme={theme}>
          <ThemeProvider theme={styledtheme}>
            {isLoading && <Loading />}
            {children}
          </ThemeProvider>
        </mui.ThemeProvider>
        {/* </Provider1> */}
      </>
    );
  };

  if ((isAppLoading || !isLoggedIn) && isPrivate) {
    return <FullPageLoading />;
  }
  if (withoutAppLayoutPath.includes(appProps.router.pathname)) {
    return CommonLayout(<Component {...pageProps} />);
  } else {
    return CommonLayout(
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>,
    );
  }
}

export default MyApp;
