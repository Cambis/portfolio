import { forwardRef, RefObject } from 'react';

import cn from 'classnames';

import { ContainerProps as Props } from './types';

const Container = (
  { children, classNames }: Props,
  ref: RefObject<HTMLInputElement>,
): JSX.Element => {
  return (
    <div ref={ref} className={cn('container', classNames)}>
      {children}
    </div>
  );
};

export default forwardRef(Container);
