import cn from 'classnames';

import { SectionProps as Props } from './types';

const Section = ({ id, children, classNames }: Props): JSX.Element => {
  return (
    <section id={id} className={cn('mx-auto flex flex-col p-5', classNames)}>
      {children}
    </section>
  );
};

export default Section;
