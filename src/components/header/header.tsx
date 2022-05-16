import { Menu } from 'components';

const Header = (): JSX.Element => (
  <header className="sticky top-0 z-50 flex h-24 w-full border-t bg-slate-900 text-white">
    <Menu />
  </header>
);

export default Header;
