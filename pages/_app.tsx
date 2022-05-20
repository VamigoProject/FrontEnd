import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import * as mui from '@mui/material/styles';
import { useSystemStore, useUserStore, useTrendStore } from 'stores';
import { lightTheme, darkTheme } from 'styles/muiTheme';
import { light, dark } from 'styles/theme';
import { useEffect, useState } from 'react';
import { Loading } from 'components';
import { AppLayout, FullPageLoading } from 'components/layout';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
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

  if ((isAppLoading || !isLoggedIn) && isPrivate) {
    return <FullPageLoading />;
  } else {
    if (withoutAppLayoutPath.includes(appProps.router.pathname)) {
      return (
        <mui.ThemeProvider theme={theme}>
          <ThemeProvider theme={styledtheme}>
            {isLoading && <Loading />}
            <Component {...pageProps} />
          </ThemeProvider>
        </mui.ThemeProvider>
      );
    }
    return (
      <>
        <mui.ThemeProvider theme={theme}>
          <ThemeProvider theme={styledtheme}>
            {isLoading && <Loading />}
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </ThemeProvider>
        </mui.ThemeProvider>
      </>
    );
  }
}

export default MyApp;
