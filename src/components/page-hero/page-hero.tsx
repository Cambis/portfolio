import { Image } from 'react-datocms';

import { Container } from 'components';

import type { PageHeroProps as Props } from './types';

const PageHero = ({ image, externalLink = '' }: Props): JSX.Element => (
  <Container classNames="w-full">
    <a href={externalLink}>
      <Image data={image} />
    </a>
  </Container>
);

export default PageHero;
