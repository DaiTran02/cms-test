import { ArticleStyle } from '@/components/DetailHead';
import ShareSocial from '@/components/ShareSocial';
import type { Category } from '@/interface/category';
import type { Article } from '@/interface/propsGlobal';
import { formatArticleDate } from '@/utils/Format';
import React from 'react';

const DetailArtSection = ({
  dataDetail,
  dataCate,
}: {
  dataDetail: Article;
  dataCate: Category;
}) => {
  return (
    <div>
      <div>
        <p className="heading-4 uppercase">{dataCate?.name}</p>
        {dataDetail?.prefixTitle && (
          <h4 className="body-2 py-3">{dataDetail?.prefixTitle}</h4>
        )}

        <h1 className="title-main py-3">{dataDetail?.title}</h1>
        {dataDetail?.publicationTime && (
          <div className={`flex body-3 font-normal items-center`}>
            <div>{dataDetail?.penName || dataDetail?.external}</div>

            {dataDetail?.publicationTime && dataDetail?.penName?.trim() && (
              <div className="dot w-2 h-2 mx-3 bg-grey"></div>
            )}
            <div className={''}>
              {dataDetail?.publicationTime &&
                formatArticleDate(dataDetail?.publicationTime)}
            </div>
          </div>
        )}
      </div>
      <ShareSocial className="my-3" />
      <hr className=" text-grey-bold  h-[0.5px]" />
      <div>
        <h2 className="heading-2 mb-[10px] mt-5 text-justify">
          {dataDetail?.sapo || dataDetail?.excerpt}
        </h2>
        <ArticleStyle
          className="font-roboto content-detail-art"
          dangerouslySetInnerHTML={{ __html: dataDetail?.postContent || '' }}
        ></ArticleStyle>
        <>{dataDetail?.copyright && <>Nguồn: {dataDetail?.copyright}</>}</>
      </div>
    </div>
  );
};

export default DetailArtSection;
