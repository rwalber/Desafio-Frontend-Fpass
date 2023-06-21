import Head from 'next/head';
import LayoutComponent from '@/layout/LayoutComponent';

import type { AppProps } from 'next/app';

import '../styles/global.css';

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

export default MyApp;