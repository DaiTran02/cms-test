import ArticleCard from '@/components/Articles/ArticleCard';
import type { PropsGlobal } from '@/interface/propsGlobal';
import React from 'react';

const CarouselTwoArt = ({ posts }: PropsGlobal) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-5">
      {posts &&
        posts?.length > 0 &&
        posts?.map((item, index) => {
          return (
            <ArticleCard
              titleStyle="heading-4"
              hasCate={false}
              hasDate={false}
              key={index}
              dataArticle={item}
            />
          );
        })}
    </div>
  );
};

export default CarouselTwoArt;
