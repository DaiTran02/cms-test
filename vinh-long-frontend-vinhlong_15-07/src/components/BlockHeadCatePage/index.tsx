import ArticleCustomCard from '@/components/Articles/ArticleCustomCard';
import GridThreeCol from '@/components/LayoutGrid/GridThreeCol';
import type { PropsGlobal } from '@/interface/propsGlobal';
import React from 'react';

const BlockHeadCatePage = ({ posts, className }: PropsGlobal) => {
  return (
    <div id="BlockHeadCatePage" className={`${className}`}>
      <GridThreeCol
        posts={posts?.slice(0, 3)}
        reverseTwoRow={true}
        className="mb-4"
      >
        {posts &&
          posts.length > 0 &&
          posts?.slice(3, 8)?.map((item, index) => (
            <div key={item?.id || index}>
              <ArticleCustomCard isReverse={true} dataArticle={item} />
              {index !== posts?.slice(3, 8)?.length - 1 && (
                <hr className="my-3 text-grey-line" />
              )}
            </div>
          ))}
      </GridThreeCol>
    </div>
  );
};

export default BlockHeadCatePage;
