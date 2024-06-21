import type { AppProps } from "next/app";

import { AuthProvider } from "@saas-ui/auth";
import { SaasProvider } from "@saas-ui/react";
import { Layout } from "components/layout";

import theme from "../theme";

import "../styles/survey.css"
import "../styles/markdown.scss"
import { AuthContextProvider } from "context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  const { announcement, header, footer } = pageProps;

  return (
    <SaasProvider theme={theme}>
      <AuthProvider> {/* Theme wala Auth */}
        {/* <AuthContextProvider> Humara wala Auth */}
        <Layout
          announcementProps={announcement}
          headerProps={header}
          footerProps={footer}
        >
          <Component {...pageProps} />
        </Layout>
        {/* </AuthContextProvider> */}
      </AuthProvider>
    </SaasProvider>
  );
}

export default MyApp;
