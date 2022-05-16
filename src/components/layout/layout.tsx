import { motion } from 'framer-motion';

import { PreviewMode } from 'components';

import { LayoutProps as Props } from './types';

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const Layout = ({ preview, children }: Props): JSX.Element => {
  return (
    <>
      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: 'linear' }}
        className="flex min-h-screen flex-col items-center justify-center bg-white py-2"
      >
        {children}
      </motion.main>

      {preview && <PreviewMode />}
    </>
  );
};

export default Layout;
