'use client';

import AdsBanner from '@/components/AdBanners';
import GridThreeCol from '@/components/LayoutGrid/GridThreeCol';
import SectionTitle from '@/components/SectionTitle';
import type { PropsGlobal } from '@/interface/propsGlobal';

const HomeH = ({ posts, dataLayoutMain }: PropsGlobal) => {
  return (
    <div id="HomeH">
      <SectionTitle
        cateAlias={dataLayoutMain?.cateAlias}
        className="mt-7 mb-4"
        title={`${dataLayoutMain?.title} `}
      />
      <GridThreeCol
        posts={posts}
        hasMiniArticle={true}
        // className="mb-4"
      >
        <div className="col-span-3">
          <AdsBanner nameAds="HomeH_Side" className="h-full w-full" />
        </div>
      </GridThreeCol>
    </div>
  );
};

export default HomeH;
