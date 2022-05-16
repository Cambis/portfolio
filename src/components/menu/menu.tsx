import React from 'react';

import Link from 'next/link';

const MenuItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link href={to}>{children}</Link>
);

const Menu = (): JSX.Element => (
  <nav className="absolute left-0 w-full text-center">
    <ul className="ml-5 mr-5 inline-block lg:list-none">
      <li className="float-left m-5 block w-32">
        <MenuItem to="/#skills">
          <a>Skills</a>
        </MenuItem>
      </li>
      <li className="float-left m-5 block w-32 bg-slate-800">
        <Link href="/#projects">
          <a>Projects</a>
        </Link>
      </li>
      <li className="float-left m-5 block w-32">
        <Link href="/#work">
          <a>Work</a>
        </Link>
      </li>
      <li className="float-left m-5 block w-32">
        <Link href="/#contact">
          <a>Contact</a>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Menu;
