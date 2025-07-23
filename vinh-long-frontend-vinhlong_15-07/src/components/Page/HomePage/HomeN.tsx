'use client';
import { type CarouselApi } from '@/components/ui/carousel';

import GridWrapper from '@/components/LayoutGrid/GridWrapper';
import SectionTitle from '@/components/SectionTitle';
import ListArticleSide from '@/components/SideRight/ListArticleSide';
import type { PropsGlobal } from '@/interface/propsGlobal';
import React from 'react';
import SlideTwoArticle from '../Home/SlideTwoArticle';

const HomeN = ({
  posts,
  dataLayout,
  className,
  dataLayoutSide,
}: PropsGlobal) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!posts) return null;
  return (
    <div id={`${dataLayout?.sectionName}`} className={`${className}`}>
      <SectionTitle
        cateAlias={dataLayout?.cateAlias}
        title={dataLayout?.title}
        className="mb-4"
      />
      <GridWrapper>
        <SlideTwoArticle
          isReverse={true}
          className="col-span-9"
          posts={posts}
        />
        <div className="col-span-3">
          <ListArticleSide
            title={dataLayoutSide?.title}
            titleCenter={true}
            hasBorder={true}
            hasDate={true}
            hasModifiedFirstPost={false}
            posts={posts?.slice(-5)}
          />
        </div>
      </GridWrapper>
    </div>
  );
};

export default HomeN;
