import React from 'react';
import SlideTwoArticle from '../Home/SlideTwoArticle';
import type { PropsGlobal } from '@/interface/propsGlobal';
import GridWrapper from '@/components/LayoutGrid/GridWrapper';
import SectionTitle from '@/components/SectionTitle';
import ArticleMini from '@/components/Articles/ArticleMini';
import ArticleCustomCard from '@/components/Articles/ArticleCustomCard';

const HomeE = ({ className, posts, dataLayout }: PropsGlobal) => {
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

        <div className="col-span-3 max-xl:mt-5">
          {posts?.slice(-5)?.map((item, index) => {
            return (
              <div key={item?.id}>
                <ArticleCustomCard
                  isReverse={true}
                  dataArticle={item}
                  width={125}
                  height={70}
                />
                {index !== posts?.slice(-5)?.length - 1 && (
                  <hr className="my-3 text-grey-line" />
                )}
              </div>
            );
          })}
        </div>
      </GridWrapper>
    </div>
  );
};

export default React.memo(HomeE);
