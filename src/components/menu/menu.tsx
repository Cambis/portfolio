import type { ReactNode } from 'react';

import Link from 'next/link';

const MenuItem = ({ to, children }: { to: string; children: ReactNode }) => (
  <li className="float-left m-5 block w-32">
    <Link href={to}>{children}</Link>
  </li>
);

const Menu = (): JSX.Element => (
  <nav className="absolute left-0 w-full text-center">
    <ul className="ml-5 mr-5 inline-block lg:list-none">
      <MenuItem to="/#skills">
        <a>Skills</a>
      </MenuItem>
      <li className="float-left m-5 block w-32">
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
