import type { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import '../../styles/globals.css';
// Import Slider styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// Import Swiper styles
import 'swiper/css';
// lightbox style
import 'react-bnb-gallery/dist/style.css';
import 'nprogress/nprogress.css'; //styles of nprogress

NProgress.configure({ showSpinner: false });
function MyApp({ Component, pageProps }: AppProps) {
  //Binding events.
  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());

  return <Component {...pageProps} />;
}

export default MyApp;
