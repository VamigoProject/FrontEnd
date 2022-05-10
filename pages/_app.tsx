import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import * as mui from '@mui/material/styles';
import useSystemStore from '../stores/system';
import { lightTheme, darkTheme } from 'styles/muiTheme';
import { light, dark } from 'styles/theme';
import useUserStore from 'stores/user';
import { useEffect } from 'react';
import Loading from 'components/Loading';
import AppLayout from 'components/AppLayout';
import useTrendStore from 'stores/trend';

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
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

  useEffect(() => {
    if (publicPath.indexOf(window.location.pathname) === -1) {
      //public이 아닌 경우
      if (!isLoggedIn) {
        location.href = '/';
      }
    }
    setTrend([]);
  }, []);

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

export default MyApp;
