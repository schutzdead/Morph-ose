import '@/styles/globals.css'
import { CartProvider } from '@/utils/cartProvider';
import { OpenCartProvider } from '@/utils/cartProvider';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { lock, unlock } from '@/utils/lockScreen';
import Router from "next/router";
import Head from 'next/head'

export default function App ({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    if(loading){
      window?.scrollTo({top: 0, left: 0});
      lock()
    } else {
      unlock()
    }

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, [loading])

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="" />
        <link
            rel="preload"
            href="/font/Quesha.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
        />
        {/* <meta property="og:image" content={mainLogo.src} /> */}
        <meta property="og:image:type" content="svg" />
        <meta property="og:image:width" content="670" />
        <meta property="og:image:height" content="383" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <OpenCartProvider>
        <CartProvider>
          {loading ?
          <div className='absolute flex items-center justify-center z-[100] w-[100vw] h-[100vh] bg-black/80'><CircularProgress /></div>
          : ''}
          <Component {...pageProps} />
        </CartProvider>
      </OpenCartProvider>
    </>
  )
}