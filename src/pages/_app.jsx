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