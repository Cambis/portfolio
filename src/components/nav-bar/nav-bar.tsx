import { useState } from 'react';

import Link from 'next/link';

import { Container } from 'components';

const navData = [
  {
    name: 'Skills',
    href: '/#skills',
  },
  {
    name: 'Projects',
    href: '/#projects',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];

const NavBar = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <Container classNames="sticky top-0 z-50 mx-auto flex w-full items-center justify-between px-5 py-6 text-2xl font-bold">
      <Link href="/">
        <a>
          <h1 className="flex h-[3.5rem] items-center text-center">Home</h1>
        </a>
      </Link>
      <nav className="hidden items-center space-x-10 md:flex">
        {navData.map((n) => {
          return (
            <Link key={n.name} href={n.href}>
              <a>{n.name}</a>
            </Link>
          );
        })}
      </nav>
      <div className="md:hidden">
        {isModalOpen ? (
          <div className="fixed right-0 top-0  h-[100vh] w-[24rem] translate-x-[-1px] rounded-lg border-[1px] border-red-100/20 bg-[#161B21] text-white  transition">
            <div className="px-5 pt-5 pb-6">
              <button onClick={() => setModalOpen(!isModalOpen)} className="float-right -mr-2 mb-3">
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
                <nav className="grid gap-y-8">
                  {navData.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-center rounded-md border-[1px] border-gray-500/60  p-3 hover:bg-black/20"
                    >
                      <h1 className="my-3 ml-3 text-3xl font-bold ">{item.name}</h1>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => setModalOpen(!isModalOpen)}>
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
      </div>
    </Container>
  );
};

export default NavBar;
