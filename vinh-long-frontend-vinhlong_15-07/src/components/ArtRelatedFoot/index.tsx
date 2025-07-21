import ArticleCustomCard from '@/components/Articles/ArticleCustomCard';
import type { Article } from '@/interface/propsGlobal';
import React from 'react';

const ArtRelatedFoot = ({ dataArticle }: { dataArticle: Article }) => {
  return (
    <div className="border border-grey mt-5 px-10 py-5 max-w-full mx-auto max-md:px-5">
      <div className="mb-3">
        <span className="heading-2 block w-full border-b border-grey">
          Tin liên quan
        </span>
      </div>
      <>
        <ArticleCustomCard
          width={295}
          height={166}
          hasSapo={true}
          className="max-md:flex-col w-full"
          titleStyle="heading-2"
          sapoStyle="line-clamp-4"
          dataArticle={dataArticle}
          hasCate={false}
          styleImg="w-full"
        />
      </>
    </div>
  );
};

export default ArtRelatedFoot;
