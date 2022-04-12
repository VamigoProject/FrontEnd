import '../styles/globals.css';
import '../styles/variables.less';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import useSystemStore from '../stores/system';
import { dark, light } from 'styles/theme';
import 'antd/dist/antd.css';
import useUserStore from 'stores/user';
import { useEffect } from 'react';
import Loading from 'components/Loading';
import AppLayout from 'components/AppLayout';

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const { themeMode, isLoading } = useSystemStore((state) => state);
  const theme = themeMode === 'light' ? light : dark;

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
  ];

  useEffect(() => {
    if (publicPath.indexOf(window.location.pathname) === -1) {
      //public이 아닌 경우
      if (!isLoggedIn) {
        location.href = '/';
      }
    }
  });

  if (withoutAppLayoutPath.includes(appProps.router.pathname)) {
    return (
      <ThemeProvider theme={theme}>
        {isLoading && <Loading />}
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        {isLoading && <Loading />}
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
