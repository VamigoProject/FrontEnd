import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import useSystemStore from '../stores/system';
import { dark, light } from 'styles/theme';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }: AppProps) {
  const themeMode = useSystemStore((state) => state.themeMode);
  const theme = themeMode === 'light' ? light : dark;

  return (
    <>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
