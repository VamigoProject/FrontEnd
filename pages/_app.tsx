import '../styles/globals.css';
import '../styles/variables.less';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import useSystemStore from '../stores/system';
import { dark, light } from 'styles/theme';
import 'antd/dist/antd.css';
import useUserStore from 'stores/user';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const themeMode = useSystemStore((state) => state.themeMode);
  const theme = themeMode === 'light' ? light : dark;

  const publicPath: Array<string> = [
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

  return (
    <>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
