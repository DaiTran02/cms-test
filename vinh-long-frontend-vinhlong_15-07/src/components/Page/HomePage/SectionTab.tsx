'use client';

import ArticleCard from '@/components/Articles/ArticleCard';
import ArticleCustomCard from '@/components/Articles/ArticleCustomCard';
import Container from '@/components/Container/Container';
import GridWrapper from '@/components/LayoutGrid/GridWrapper';
import SectionTitle from '@/components/SectionTitle';
import VideoPlay from '@/components/VideoPlay';
import type { Article } from '@/interface/propsGlobal';
import type { QueryType } from '@/interface/queryType';
import { useFetchMediaById } from '@/Services/ClientServices/media';
import { formatArticleDate } from '@/utils/Format';
import Link from 'next/link';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const SectionTab = ({
  posts,
  dataTab,
  dataHomeJ3,
  dataLayoutMain,
  dataLayoutTab,
}: {
  posts: Article[];
  dataTab: Article[];
  dataHomeJ3?: Article[];
  dataLayoutMain: QueryType;
  dataLayoutTab: QueryType;
}) => {
  if (!posts) {
    return null;
  }
  const [postRender, setPostRender] = useState(posts[0]);
  const file = (postRender?.postMedia && postRender?.postMedia[0]?.file) || '';
  return (
    <div
      id={`${dataLayoutMain?.sectionName}-tabSc`}
      className="bg-black py-5 mt-7"
    >
      <Container>
        <div>
          <SectionTitle
            className="mb-5"
            title={dataLayoutMain?.title}
            cateAlias={dataLayoutMain?.cateAlias}
          />
        </div>
        <GridWrapper>
          <div
            className={`col-span-8 gap-5 max-xs-max:flex max-xs-max:flex-col`}
          >
            {file ? (
              <div>
                <VideoPlay media={postRender} file={file} />
                <h2 className="heading-2 text-white mt-5">
                  {postRender?.title}
                </h2>

                <div className={twMerge('flex gap-2 items-center mt-2')}>
                  <div className={'text-white'}>
                    {postRender?.publicationTime &&
                      formatArticleDate(postRender?.publicationTime)}
                  </div>
                  <div className="dot"></div>
                  <div className={'text-white'}>
                    {postRender?.category?.categoryName || postRender?.penName}
                  </div>
                </div>
              </div>
            ) : (
              <ArticleCard
                dataArticle={postRender}
                titleStyle="heading-2 text-white"
                sapoStyle="line-clamp-2"
                hasCate={true}
                hasDate={true}
                width={820}
                height={400}
                hasSapo={true}
              />
            )}
          </div>
          <div
            className={`scrollbar col-span-4 max-h-[542px] h-full max-lg:h-fit overflow-x-hidden`}
          >
            <div className=" flex flex-col gap-4 overflow-x-hidden overflow-y-auto">
              {posts?.map((item, index) => {
                return (
                  <div
                    className="cursor-pointer"
                    key={item?.id || index}
                    onClick={(e) => {
                      setPostRender(item);
                    }}
                  >
                    <ArticleCustomCard
                      titleStyle="heading-4 text-white"
                      className="pr-3 pointer-events-none"
                      dataArticle={item}
                      hiddenIcon={true}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </GridWrapper>
      </Container>
    </div>
  );
};

export default React.memo(SectionTab);
