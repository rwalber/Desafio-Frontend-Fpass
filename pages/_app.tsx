import Head from 'next/head';
import Navbar from '@/layout/navbar';

import '../styles/global.css';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {

  return(
    <>
      <Head>
        <title>Marvel Wiki</title>
        <meta name="Wiki dos hérois da Marvel" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
