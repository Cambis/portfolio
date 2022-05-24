import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import { Container } from 'components';
import { FOOTER_NAV_DATA } from 'lib/constants';

const Footer = (): JSX.Element => (
  <footer>
    <Container classNames="flex flex-wrap space-between w-full my-5">
      <div className="w-full text-center lg:w-1/2 lg:text-left">
        {FOOTER_NAV_DATA.map((item) => (
          <Link key={item.name} href={item.href}>
            <a className="px-4 py-5">{item.name}</a>
          </Link>
        ))}
      </div>
      <div className="w-full text-center lg:w-1/2 lg:text-right">
        <a
          className="inline-block px-4 py-5 lg:mr-4 lg:p-0"
          href="https://github.com/Cambis"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="m-auto block" />
        </a>
        <a
          className="inline-block px-4 py-5 lg:mr-4 lg:p-0"
          href="https://www.linkedin.com/in/cameron-bryers-3b179023b/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className="m-auto block" />
        </a>
      </div>
    </Container>
    <Container classNames="flex border-t items-center align-center justify-center">
      <div className="prose p-4 text-center lg:prose-lg">© Copyright Cameron Bryers MMXXII</div>
    </Container>
  </footer>
);

export default Footer;
