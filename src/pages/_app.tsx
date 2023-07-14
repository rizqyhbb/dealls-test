import { ThemeProvider } from "@emotion/react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import theme from "../styles/theme";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <NextNProgress />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
