import { Image } from 'react-datocms';

import { Container } from 'components';

import type { PageHeroProps as Props } from './types';

const PageHero = ({ image, externalLink = '' }: Props): JSX.Element => (
  <Container classNames="w-full bg-slate-900 my-5">
    <a href={externalLink} target="_blank" rel="noreferrer">
      <Image data={image} />
    </a>
  </Container>
);

export default PageHero;
