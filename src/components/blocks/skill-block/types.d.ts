import type { Record } from 'datocms-structured-text-utils';

import type { FileField } from 'lib/graphql';

type SkillBlockProps = Record & {
  icon: FileField;
};
