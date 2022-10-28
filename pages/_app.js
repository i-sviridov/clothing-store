import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../components/theme';
import createEmotionCache from '../components/createEmotionCache';
import { FavoritesContextProvider } from '../context/favorites-context';
import '../styles.css';
import Navigation from '../components/navigation/navigation';
import { AuthContextProvider } from '../context/auth-context';
import { CartContextProvider } from '../context/cart-context';
import { SessionProvider } from 'next-auth/react';
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    session,
    pageProps,
  } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SessionProvider session={session}>
          <CartContextProvider>
            <AuthContextProvider>
              <FavoritesContextProvider>
                <Navigation />
                <Component {...pageProps} />
              </FavoritesContextProvider>
            </AuthContextProvider>
          </CartContextProvider>
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
