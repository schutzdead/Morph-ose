import '@/styles/globals.css'
import { CartProvider } from '@/utils/cartProvider';
import { OpenCartProvider } from '@/utils/cartProvider';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { lock, unlock } from '@/utils/lockScreen';
import Router from "next/router";
import Head from 'next/head'
import mainLogo from '../../public/assets/header/logo1.svg'

export default function App ({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, [loading])

  return (
    <>
      <Head>
        <title>{`Merveilles de Morph'ose`}</title>
        <meta name="description" content="Découvrez notre boutique ésotérique : Minéraux, Encens spirituel, Bougies, Librairie et pleins d'autres merveilleurses choses." />
        <link rel="preload" href="/assets/main/fullscreen2.webp" as="image"/>

        <meta property="og:image" content={mainLogo.src} />
        <meta property="og:image:type" content="png" />
        <meta property="og:image:width" content="350" />
        <meta property="og:image:height" content="350" />

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
          <div className='fixed flex items-center justify-center z-[100] inset-0 bg-black/80'><CircularProgress /></div>
          : ''}
          <div className='overflow-x-clip'>
            <Component {...pageProps} />
          </div>
        </CartProvider>
      </OpenCartProvider>
    </>
  )
}