import Head from 'next/head';
import LayoutComponent from '@/layout/LayoutComponent';

import type { AppProps } from 'next/app';

import '../styles/global.css';
import App from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {

  return(
    <>
      <Head>
        <title>Marvel Wiki</title>
        <meta name="Wiki about your favorite marvel hero" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>      
    </>
  )
}

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;