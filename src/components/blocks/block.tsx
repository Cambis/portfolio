import type { Record } from 'datocms-structured-text-utils';

import { SkillBlock } from './index';
import type { BlockProps as Props } from './types';

const Block = ({ record }: Props): JSX.Element => {
  const components = {
    SkillRecord: SkillBlock,
  };

  const Component = components[record.__typename];

  if (Component) {
    return <Component {...(record as Record)} />;
  }

  return (
    <>
      <p>Don&apos;t know how to render a block!</p>
      <pre>{JSON.stringify(record, null, 2)}</pre>
    </>
  );
};

export default Block;
