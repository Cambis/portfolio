import type { SkillBlockProps as Props } from './types';

const SkillBlock = ({ icon }: Props) => (
  <div className="block w-64 p-5">
    <img src={icon.url} alt={icon.alt} />
  </div>
);

export default SkillBlock;
