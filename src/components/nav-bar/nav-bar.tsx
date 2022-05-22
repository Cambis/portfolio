import { motion, AnimatePresence, useCycle } from 'framer-motion';
import Link from 'next/link';

import { Container } from 'components';
import { NAV_DATA } from 'lib/constants';

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity: 1,
  },
};

const NavBar = () => {
  const [open, cycleOpen] = useCycle(false, true);

  return (
    <Container classNames="flex w-full items-center justify-between px-5 py-6 text-2xl font-bold">
      <Link href="/">
        <a>
          <h1 className="flex h-[3.5rem] items-center text-center">Home</h1>
        </a>
      </Link>
      <nav className="hidden items-center space-x-10 md:flex">
        {NAV_DATA.map((n) => {
          return (
            <Link key={n.name} href={n.href}>
              <a>{n.name}</a>
            </Link>
          );
        })}
      </nav>
      <div className="md:hidden">
        <AnimatePresence>
          {open ? (
            <motion.div
              className="fixed right-0 top-0 h-[100vh] w-[24rem] rounded-lg border-[1px] border-red-100/20 bg-[#161B21] text-white"
              initial={{ width: 0 }}
              animate={{ width: '24rem' }}
              exit={{
                width: 0,
                transition: {
                  delay: 0.7,
                  duration: 5,
                },
              }}
            >
              <div className="px-5 pt-5 pb-6">
                <button onClick={() => cycleOpen()} className="float-right -mr-2 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
                <div className="relative z-10 mt-[5rem]">
                  <motion.nav
                    className="grid gap-y-8"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={sideVariants}
                  >
                    {navData.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <motion.a
                          className="-m-3 flex items-center rounded-md border-[1px] border-gray-500/60  p-3 hover:bg-black/20"
                          whileHover={{ scale: 1.1 }}
                          variants={itemVariants}
                        >
                          <h1 className="my-3 ml-3 text-3xl font-bold ">{item.name}</h1>
                        </motion.a>
                      </Link>
                    ))}
                  </motion.nav>
                </div>
              </div>
            </motion.div>
          ) : (
            <button onClick={() => cycleOpen()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="white"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          )}
        </AnimatePresence>
      </div>
    </Container>
  );
};

export default NavBar;
