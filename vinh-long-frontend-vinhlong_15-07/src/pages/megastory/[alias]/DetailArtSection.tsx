import ShareSocial from '@/components/ShareSocial';
import type { Category } from '@/interface/category';
import type { Article } from '@/interface/propsGlobal';
import { formatArticleDate } from '@/utils/Format';
import styled from 'styled-components';
export const ArticleStyleEmagazine = styled.article`
  figure.image {
    display: inline-block;
    width: 100%;
  }

  figure.align-left {
    float: left;
  }

  figure.align-right {
    float: right;
  }

  figure.image img {
    object-fit: cover;
    width: 100%;
  }

  figure.image figcaption {
    margin: 8px 8px 8px 8px;
    padding-bottom: 8px;
    text-align: center;
    position: relative;
    line-height: 24px;
    font-size: 15px;
  }

  figure.image figcaption::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 160px; /* or 100px */
    margin: auto;
    border-bottom: 0.5px solid #7b7b7b;
  }

  /* blockquote */
  blockquote {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 40px;
    margin-inline-end: 40px;
  }

  blockquote.quotation {
    position: relative;
    margin-top: 30px;
  }

  blockquote.quotation::before {
    position: absolute;
    content: '“';
    font-family: 'Ruge Boogie', sans-serif;
    font-size: 120px;
    font-style: normal;
    font-weight: 400;
    left: -50px;
    top: -10px;
    line-height: 90px;
  }

  blockquote.line {
    margin: 0;
    border-left: 2px solid #4f4f4f;
    padding: 16px 0 16px 24px;
  }

  /* quote box */
  div.quotebox {
    padding: 8px 20px 8px 20px;
    margin-block: 20px;
  }

  div.quotebox.quotebox-f2f1ed {
    background-color: #f2f1ed;
  }

  div.quotebox.quotebox-faf8f8 {
    background-color: #faf8f8;
  }

  div.quotebox.quotebox-f1f9ff {
    background-color: #f1f9ff;
  }

  div.quotebox.quotebox-e5f5ed {
    background-color: #e5f5ed;
  }

  /* text */
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  div {
    margin-block: 12px;
  }

  h1 {
    font-weight: 600;
    font-size: 24px;
    line-height: 35px;
  }
  h2 {
    font-weight: 600;
    font-size: 22px;
    line-height: 31px;
  }
  h3 {
    font-weight: 600;
    font-size: 20px;
    line-height: 29px;
  }
  h4 {
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
  }
  h5 {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  div,
  p {
    font-weight: 400;
    font-size: 17px;
    line-height: 24px !important;
  }

  a {
    color: #125794;
  }
`;
const DetailArtSection = ({
  dataDetail,
  dataCate,
}: {
  dataDetail: Article;
  dataCate: Category;
}) => {
  return (
    <div className="text-center">
      <div className="">
        <p className="heading-4 uppercase">{dataCate?.name}</p>
        {dataDetail?.prefixTitle && (
          <h2 className="body-2 py-3">{dataDetail?.prefixTitle}</h2>
        )}

        <h1 className="title-main py-3">{dataDetail?.title}</h1>
        <div className={`flex justify-center body-3 font-normal items-center`}>
          <div>{dataDetail?.penName}</div>
          {dataDetail?.penName?.trim() && dataDetail?.publicationTime && (
            <div className="dot w-2 h-2 mx-3 bg-grey-bold"></div>
          )}
          <div className={''}>
            {dataDetail?.publicationTime &&
              formatArticleDate(dataDetail?.publicationTime)}
          </div>
        </div>
      </div>
      <ShareSocial className="my-3" />
      <hr className=" text-grey-bold  h-[0.5px]" />
      <div>
        <p className="heading-2 mb-[10px] mt-5 mx-auto max-w-[800px] text-justify">
          {dataDetail?.excerpt || dataDetail?.sapo}
        </p>
        <ArticleStyleEmagazine
          className="font-roboto text-justify content-detail-art"
          dangerouslySetInnerHTML={{ __html: dataDetail?.postContent || '' }}
        ></ArticleStyleEmagazine>
        <>{dataDetail?.copyright && <>Nguồn: {dataDetail?.copyright}</>}</>
      </div>
    </div>
  );
};

export default DetailArtSection;
