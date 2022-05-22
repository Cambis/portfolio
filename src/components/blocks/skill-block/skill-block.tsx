import type { SkillBlockProps as Props } from './types';

const SkillBlock = ({ icon }: Props): JSX.Element => (
  <div className="block w-48 p-5">
    <img src={icon.url} alt={icon.alt} />
  </div>
);

export default SkillBlock;
