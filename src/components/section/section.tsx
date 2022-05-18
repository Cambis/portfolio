import cn from 'classnames';

import { SectionProps as Props } from './types';

const Section = ({ id, children, classNames }: Props): JSX.Element => {
  return (
    <section id={id} className={cn('flex flex-col text-center', classNames)}>
      {children}
    </section>
  );
};

export default Section;
