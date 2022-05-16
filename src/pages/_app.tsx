import 'styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';

import { Header, Footer } from 'components';
import { scrollToHash } from 'lib/motion';

const MyApp = ({ Component, pageProps, router }: AppProps): JSX.Element => (
  <>
    <Header />
    <AnimatePresence exitBeforeEnter initial={false} onExitComplete={scrollToHash}>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
    <Footer />
  </>
);

export default MyApp;
