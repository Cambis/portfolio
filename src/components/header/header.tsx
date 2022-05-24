import { Container } from 'components';

const Header = (): JSX.Element => (
  <header className="flex w-full flex-col border-t bg-slate-900 text-center text-white">
    <Container classNames="py-10">
      <h1 className="text-2xl font-bold lg:text-4xl">Cameron Bryers - Web Developer</h1>
    </Container>
  </header>
);

export default Header;
