import type { AppProps } from "next/app";

import { ApolloProvider } from "@apollo/client";

import { useApollo } from "lib/apollo-client";
import Layout from "components/Layout";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps, null);

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
