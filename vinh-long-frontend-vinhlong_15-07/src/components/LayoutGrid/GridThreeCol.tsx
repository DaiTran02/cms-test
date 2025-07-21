import ArticleCard from '../Articles/ArticleCard';
import SectionTitle from '../SectionTitle';
import GridWrapper from './GridWrapper';
import ArticleMini from '../Articles/ArticleMini';
import type { Article, PropsGlobal } from '@/interface/propsGlobal';
import type { ReactNode } from 'react';
import ArticleCustomCard from '../Articles/ArticleCustomCard';
import { twMerge } from 'tailwind-merge';

const GridThreeCol = ({
  posts,
  children,
  hasMiniArticle = false,
  reverseTwoRow = false,
  hideSideRight = false,
  className,
}: {
  posts?: Article[];
  children?: ReactNode;
  hasMiniArticle?: boolean;
  reverseTwoRow?: boolean;
  hideSideRight?: boolean;
  className?: string;
}) => {
  if (!posts) {
    return null;
  }
  const styleGrid = 'grid gap-5';
  const styleFlex = 'flex flex-row-reverse';
  return (
    <div id="gridThreeCol" className={`${className}`}>
      <GridWrapper className={hideSideRight ? 'flex' : ''}>
        <div className={`${hideSideRight ? 'col-span-13' : 'col-span-9'}`}>
          <div
            className={` max-lg:flex max-lg:flex-col 
              ${hideSideRight ? 'grid-cols-12' : 'grid-cols-9'}
               ${
                 reverseTwoRow == true
                   ? twMerge(styleGrid, styleFlex)
                   : styleGrid
               }
           `}
          >
            <div
              className={` w-full ${
                hideSideRight
                  ? 'col-span-9'
                  : 'max-w-[610px] col-span-6 max-xl:max-w-full '
              }`}
            >
              <ArticleCard
                align="center"
                dataArticle={posts[0]}
                titleStyle="heading-1"
                width={1090}
                height={331}
                iconType="align"
                className="max-md:w-full"
              />
            </div>
            <div className={`col-span-3 ${reverseTwoRow && 'flex-1'}`}>
              <div className="flex flex-col gap-5">
                {posts
                  ?.slice(1, (hideSideRight && 4) || 3)
                  .map((item, index) => {
                    return (
                      <ArticleCard
                        titleStyle="heading-4"
                        hasCate={false}
                        hasDate={false}
                        key={item?.id}
                        dataArticle={item}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          {hasMiniArticle && (
            <div
              className="grid grid-cols-3 gap-5 pt-4 mt-4 border-t-1
            max-md:flex max-md:flex-col"
            >
              {posts?.slice(1, 4).map((item, index) => {
                return (
                  <ArticleCustomCard
                    width={125}
                    height={70}
                    key={item?.id}
                    titleStyle="body-2"
                    dataArticle={item}
                  />
                );
              })}
            </div>
          )}
        </div>

        {!hideSideRight && <div className="col-span-3">{children}</div>}
      </GridWrapper>
    </div>
  );
};

export default GridThreeCol;
