import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import { Container } from 'components';
import { FOOTER_NAV_DATA } from 'lib/constants';

const Footer = (): JSX.Element => (
  <footer className="flex w-full flex-col items-center justify-center">
    <Container classNames="flex flex-row w-full my-5">
      <div className="w-full text-left lg:w-1/2">
        {FOOTER_NAV_DATA.map((item) => (
          <Link key={item.name} href={item.href}>
            <a className="px-4 py-5">{item.name}</a>
          </Link>
        ))}
      </div>
      <div className="w-full text-right lg:w-1/2">
        <a
          className="mr-4 inline-block"
          href="https://github.com/Cambis"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </a>
        <a
          className="mr-4 inline-block"
          href="https://github.com/Cambis"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin />
        </a>
      </div>
    </Container>
    <Container classNames="flex border-t items-center align-center justify-center">
      <div className="prose p-4 text-center lg:prose-lg">© Copyright Cameron Bryers MMXXII</div>
    </Container>
  </footer>
);

export default Footer;
