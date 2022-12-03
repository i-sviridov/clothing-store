import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../components/theme";
import createEmotionCache from "../components/createEmotionCache";
import { FavoritesContextProvider } from "../context/favorites-context";
import "../styles.css";
import Navigation from "../components/navigation/navigation";
import { SessionProvider } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
import store from "../store/index";

const clientSideEmotionCache = createEmotionCache();

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 200, y: 0 },
};

export default function MyApp(props) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    session,
    pageProps,
    router,
  } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SessionProvider session={session}>
          <FavoritesContextProvider>
            <Provider store={store}>
              <Navigation />
              <AnimatePresence>
                <motion.main
                  key={router.pathname}
                  initial="hidden"
                  animate="enter"
                  exit="exit"
                  variants={variants}
                  transition={{ type: "linear" }}
                >
                  <Component {...pageProps} />
                </motion.main>
              </AnimatePresence>
            </Provider>
          </FavoritesContextProvider>
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
