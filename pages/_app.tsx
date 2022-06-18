import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import * as mui from '@mui/material/styles';
import { useSystemStore, useUserStore, useTrendStore } from 'stores';
import { lightTheme, darkTheme } from 'styles/muiTheme';
import { light, dark } from 'styles/theme';
import React, { useEffect, useState } from 'react';
import { Loading } from 'components';
import { AppLayout, FullPageLoading } from 'components/layout';
import { useRouter } from 'next/router';
import { trendApi, myProfileApi } from 'utils/api';
import Head from 'next/head';
import Script from 'next/script';

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const router = useRouter();
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);

  const { isLoggedIn, uid, updateAction } = useUserStore((state) => state);
  const { setTrend, clearTrend } = useTrendStore((state) => state);

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

  const fetch = async () => {
    try {
      const trends = await trendApi();
      let index = 0;
      const timerId = setInterval(() => {
        if (index === 10) {
          clearInterval(timerId);
          return;
        }
        if (trends[index] !== undefined) {
          setTrend(undefined, index);
          setTrend(trends[index], index);
        } else {
          setTrend(undefined, index);
        }
        index = index + 1;
      }, 400);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (!isAppLoading && isPrivate && !isLoggedIn) router.push('/');
    if (!isAppLoading && !isPrivate && isLoggedIn) router.push('/home');
    setIsAppLoading(false);
  }, [isAppLoading, isPrivate, isLoggedIn]);

  useEffect(() => {
    if (isPrivate && isLoggedIn) {
      clearTrend();
      fetch();
    }
  }, []);

  const updateFetch = async () => {
    try {
      const { nickname, profile, introduce } = await myProfileApi(uid!);
      updateAction(nickname, profile, introduce);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (isPrivate) updateFetch();
  }, [router.pathname]);

  const CommonLayout = (children: React.ReactNode) => {
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <title>Vamigo</title>
        </Head>
        <Script
          strategy="beforeInteractive"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.MAP_API_KEY}`}
        />
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
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <title>Vamigo</title>
        </Head>
        <Script
          strategy="beforeInteractive"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.MAP_API_KEY}`}
        />
        <FullPageLoading />
      </>
    );
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
