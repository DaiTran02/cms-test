'use client';
import Comments from '@/components/Comments';
import ShareSocial from '@/components/ShareSocial';
import type { Category } from '@/interface/category';
import type { Article } from '@/interface/propsGlobal';
import { formatArticleDate } from '@/utils/Format';
import React from 'react';
import styled from 'styled-components';

export const ArticleStyle = styled.article`
  /* figure */
  & figure,
  img {
    display: block;
    width: 100% !important;
    margin-bottom: 24px;
  }

  & figure img {
    width: 100%;
    object-fit: cover;
  }

  & figure figcaption {
    color: #292929;
    font-size: 15px;
    font-weight: 400;
    line-height: 24px;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 8px;
    position: relative;
  }

  & figure figcaption:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    width: 160px; /* or 100px */
    margin: auto;
    border-bottom: 0.5px solid #7b7b7b;
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
  p,
  div {
    display: block;
    font-weight: 400;
    font-size: 17px;
    line-height: 24px !important;
  }
  & a {
    color: #125794;
    word-break: break-all;
  }

  /* blockquote */
  & .ckc-blockquote-0 {
    border-left: 2px solid #4f4f4f;
    padding: 10px 20px;
    margin-left: 20px;
  }

  & .ckc-blockquote-0 figure {
    margin-top: 28px;
  }

  & .ckc-blockquote-0 a {
    color: #125794;
  }

  /* blockquote-1,blockquote-2  */
  & .ckc-blockquote-1,
  & .ckc-blockquote-2 {
    position: relative;
    margin-left: 85px;
    margin-right: 50px;
    margin-bottom: 24px;
  }

  & .ckc-blockquote-1::before,
  & .ckc-blockquote-2::before {
    position: absolute;
    content: '“';
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    left: -60px;
    top: -5px;
    color: #000;
    font-size: 120px;
    font-style: normal;
    font-weight: 400;
    line-height: 90px;
    width: 36px;
  }

  & .ckc-blockquote-1 p:first-child,
  & .ckc-blockquote-2 p:first-child {
    margin-bottom: 24px;
  }

  & .ckc-blockquote-1 p strong::before,
  & .ckc-blockquote-2 p strong::before {
    content: '';
    display: inline-flex;
    width: 50px;
    height: 1px;
    background: #97b640;
  }

  & .ckc-blockquote-1 p strong::after,
  & .ckc-blockquote-2 p strong::after {
    content: '';
    display: inline-flex;
    width: 50px;
    height: 1px;
    background: #97b640;
  }

  & .ckc-blockquote-1 p strong,
  & .ckc-blockquote-2 p strong {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
  }

  /* blockquote-4 */
  & .ckc-blockquote-4,
  & .ckc-blockquote-5,
  & .ckc-blockquote-6 {
    padding: 20px 40px;
    background: #f9f9f9;
    margin-bottom: 24px;
  }
`;

const DetailHead = ({
  dataDetail,
  dataCate,
  className,
  hideComment = false,
  styleTitle,
}: {
  dataDetail: Article;
  dataCate?: Category;
  className?: string;
  hideComment?: boolean;
  styleTitle?: string;
}) => {
  return (
    <div className={`${className} text-justify`}>
      <div>
        <p className="heading-4 uppercase">{dataCate?.name}</p>
        {dataDetail?.prefixTitle && (
          <h2 className="body-2 py-3">{dataDetail?.prefixTitle}</h2>
        )}
        <h1 className={`title-main py-3 text-justify ${styleTitle}`}>
          {dataDetail?.title}
        </h1>
        <div className={`flex body-3 font-normal items-center mb-2`}>
          <div className="font-bold">
            {dataDetail?.penName || dataDetail?.external}
          </div>
          {dataDetail?.publicationTime &&
            (dataDetail?.penName?.trim() || dataDetail?.external?.trim()) && (
              <div className="dot w-2 h-2 mx-3 bg-grey-bold"></div>
            )}
          <div className={''}>
            {dataDetail?.publicationTime &&
              formatArticleDate(dataDetail?.publicationTime)}
          </div>
        </div>
      </div>
      <div>
        <h3 className="heading-3 mb-[10px]">
          {dataDetail?.sapo || dataDetail?.excerpt}
        </h3>
        <ArticleStyle
          className="content-render content-detail-art font-roboto"
          dangerouslySetInnerHTML={{
            __html: dataDetail?.postContent || '',
          }}
        ></ArticleStyle>
        <>{dataDetail?.copyright && <>Nguồn: {dataDetail?.copyright}</>}</>
      </div>
      {!hideComment && (
        <>
          <ShareSocial className="my-3" />
          <Comments />
        </>
      )}
    </div>
  );
};

export default DetailHead;
