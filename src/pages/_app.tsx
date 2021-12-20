import React, { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import { Toaster } from 'react-hot-toast';
import '../../styles/globals.css';
// Import Slider styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// Import Swiper styles
import 'swiper/css';
// lightbox style
import 'react-bnb-gallery/dist/style.css';
import 'nprogress/nprogress.css'; //styles of nprogress
import { ContextProvider } from '../context';

import AgePopup from '@/components/popups/age';
import EmailSubscribe from '@/components/popups/emailSubscribe';

NProgress.configure({ showSpinner: false });
function MyApp({ Component, pageProps }: AppProps) {
  //Binding events.
  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());

  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 20000);
  }, []);
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);
  const handlePopup = () => {
    setShow(!show);
  };

  return (
    <ContextProvider>
      <Component {...pageProps} />
      {show && <EmailSubscribe close={handlePopup} />}
      <AgePopup />
      <Toaster />
    </ContextProvider>
  );
}

export default MyApp;
