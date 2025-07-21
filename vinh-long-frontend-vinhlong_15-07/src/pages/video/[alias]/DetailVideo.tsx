import Comments from '@/components/Comments';
import { ArticleStyle } from '@/components/DetailHead';
import ShareSocial from '@/components/ShareSocial';
import type { Category } from '@/interface/category';
import type { Article } from '@/interface/propsGlobal';
import { formatArticleDate } from '@/utils/Format';
import React from 'react';

const DetailVideo = ({
  dataDetail,
  dataCate,
  className,
}: {
  dataDetail: Article;
  dataCate: Category;
  className?: string;
}) => {
  return (
    <div className={`${className}`}>
      <div>
        <p className="heading-4 uppercase">{dataCate?.name}</p>
        {dataDetail?.prefixTitle && (
          <h2 className="body-2 py-3">{dataDetail?.prefixTitle}</h2>
        )}
        <h1 className="title-main py-3">{dataDetail?.title}</h1>
        <div className={`flex body-3 font-normal items-center`}>
          <div className="font-bold">
            {dataDetail?.penName?.trim() || dataDetail?.external}
          </div>
          <div className="dot w-2 h-2 mx-3 bg-black"></div>
          <div className={''}>
            {dataDetail?.publicationTime &&
              formatArticleDate(dataDetail?.publicationTime)}
          </div>
        </div>
      </div>
      <div>
        <h3 className="heading-3 mb-[10px] text-justify">
          {dataDetail?.sapo?.trim() || dataDetail?.excerpt}
        </h3>
        <ArticleStyle
          className="content-render content-detail-art"
          dangerouslySetInnerHTML={{
            __html: dataDetail?.postContent || '',
          }}
        ></ArticleStyle>
        <>{dataDetail?.copyright && <>Nguồn: {dataDetail?.copyright}</>}</>
      </div>
      <ShareSocial className="my-3" />
      <Comments />
    </div>
  );
};

export default DetailVideo;
