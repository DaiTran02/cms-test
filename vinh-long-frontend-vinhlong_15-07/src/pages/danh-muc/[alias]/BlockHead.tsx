import GridThreeCol from '@/components/LayoutGrid/GridThreeCol';
import type { PropsGlobal } from '@/interface/propsGlobal';

const BlockHead = ({ posts }: PropsGlobal) => {
  return (
    <div id="BlockHead">
      <GridThreeCol posts={posts} hideSideRight={true} />
    </div>
  );
};

export default BlockHead;
