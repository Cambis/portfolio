import { PreviewMode } from 'components';

import { LayoutProps as Props } from './types';

const Layout = ({ preview, children }: Props): JSX.Element => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center py-2">
        {children}
      </main>

      {preview && <PreviewMode />}
    </>
  );
};

export default Layout;
