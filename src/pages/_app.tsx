import 'styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';

import { Header, Footer } from 'components';

const handleExitComplete = (): void => {
  console.log('HERE');
  if (typeof window !== 'undefined') {
    const hashId = window.location.hash;

    console.log({ location: window.location, hashId });

    if (hashId) {
      const element = document.querySelector(hashId);
      console.log({ element });

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    }
  }
};

const MyApp = ({ Component, pageProps, router }: AppProps): JSX.Element => (
  <>
    <Header />
    <AnimatePresence exitBeforeEnter initial={false} onExitComplete={handleExitComplete}>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
    <Footer />
  </>
);

export default MyApp;
