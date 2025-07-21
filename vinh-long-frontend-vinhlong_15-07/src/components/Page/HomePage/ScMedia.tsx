'use client';

import { MediaArtItem } from '@/components/MediaArtItem';
import type { Article, PropsGlobal } from '@/interface/propsGlobal';
import type { QueryType } from '@/interface/queryType';

const ScMedia = ({
  posts,
  dataHomeBlock2,
  dataHomeBlock3,
  dataLayoutMain,
  dataHomeBlock4,
  dataLayoutBlock2,
  dataLayoutBlock3,
  dataLayoutBlock4,
}: {
  posts?: Article[];
  dataHomeBlock2?: Article[];
  dataHomeBlock3?: Article[];
  dataHomeBlock4?: Article[];
  dataLayoutBlock3?: QueryType;
  dataLayoutBlock4?: QueryType;
  dataLayoutMain?: QueryType;
  dataLayoutBlock2?: QueryType;
}) => {
  return (
    <div
      id={`${dataLayoutBlock3?.sectionName}`}
      className={`grid mt-7 gap-5 max-md:grid-cols-1 ${
        dataHomeBlock4 ? ' grid-cols-4' : ' grid-cols-3'
      } max-lg:flex flex-wrap`}
    >
      {posts && (
        <MediaArtItem
          cateAlias={dataLayoutMain?.cateAlias}
          title={dataLayoutMain?.title}
          posts={posts}
        />
      )}
      {posts && (
        <MediaArtItem
          cateAlias={dataLayoutBlock2?.cateAlias}
          title={dataLayoutBlock2?.title}
          posts={dataHomeBlock2}
        />
      )}
      {posts && (
        <MediaArtItem
          cateAlias={dataLayoutBlock3?.cateAlias}
          title={dataLayoutBlock3?.title}
          posts={dataHomeBlock3}
        />
      )}
      {posts && (
        <MediaArtItem
          cateAlias={dataLayoutBlock4?.cateAlias}
          title={dataLayoutBlock4?.title}
          posts={dataHomeBlock4}
        />
      )}
    </div>
  );
};

export default ScMedia;
