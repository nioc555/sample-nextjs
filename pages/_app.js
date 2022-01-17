//版面
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../styles/createEmotionCache';
import Typography from '@mui/material/Typography';
import "../styles/global.css";
import theme from '../styles/theme';
import _ from "lodash";

const clientSideEmotionCache = createEmotionCache();
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright ©  Coin & Wanyi - '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
export default function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>Coin & Wanyi Nextjs</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <div style={{minHeight:'calc(100vh - 50px)',padding:10}}>
                    <Component {...pageProps} />
                </div>
                <Copyright />
            </ThemeProvider>
        </CacheProvider>
    );
}