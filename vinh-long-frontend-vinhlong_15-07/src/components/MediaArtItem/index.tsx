import React from 'react';
import SectionTitle from '../SectionTitle';
import ArticleCard from '../Articles/ArticleCard';
import type { PropsGlobal } from '@/interface/propsGlobal';
import ArticleCustomCard from '../Articles/ArticleCustomCard';

export const MediaArtItem = ({
  title,
  posts,
  cateAlias,
  className,
}: PropsGlobal) => {
  if (!posts) {
    return null;
  }
  return (
    <div className={`w-full ${className}`}>
      <SectionTitle cateAlias={cateAlias} className={`mb-4 `} title={title} />
      <div className="flex flex-col gap-4">
        <ArticleCard
          dataArticle={posts[0]}
          hasCate={false}
          hasDate={false}
          titleStyle="heading-3"
          width={430}
          height={223}
        />
        {posts &&
          posts?.slice(1, 3).map((item, index) => {
            return (
              <div key={item?.id || index}>
                <ArticleCustomCard
                  titleStyle="body-1"
                  dataArticle={item}
                  className={`${
                    index + 1 != Number(posts?.[index]) ? 'mb-4' : ''
                  }`}
                />
                {index != 1 && <hr className="text-black" />}{' '}
              </div>
            );
          })}
      </div>
    </div>
  );
};
