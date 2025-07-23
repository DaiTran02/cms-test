// @ts-nocheck
import ArticleCustomCard from '@/components/Articles/ArticleCustomCard';
import ArticleMini from '@/components/Articles/ArticleMini';
import ViewMoreButton from '@/components/Button/ViewMoreButton';
import GridWrapper from '@/components/LayoutGrid/GridWrapper';
import SectionTitle from '@/components/SectionTitle';
import ListArticleSide from '@/components/SideRight/ListArticleSide';
import { useFetchArticleList } from '@/hooks/useArticle';
import type { Article, PropsGlobal } from '@/interface/propsGlobal';
import type { QueryType } from '@/interface/queryType';
import { useEffect, useState } from 'react';

const BlockFoot = ({
  posts,
  dataLayoutMain,
  dataLayoutSide,
  dataSide,
  params,
  dataSideTop,
}: {
  posts: Article[];
  dataLayoutMain: PropsGlobal;
  dataLayoutSide: PropsGlobal;
  dataSide: Article[];
  dataSideTop: Article[];
  params?: boolean;
}) => {
  const [limit, setLimit] = useState<number>(5);
  const [skip, setSkip] = useState<number | null>(null);

  const handleViewMore = () => {
    if (skip == null) {
      setSkip(params ? 5 : 13);
    } else {
      setSkip(skip + 5);
    }
  };
  const payloadArtViewMore =
    skip !== null
      ? {
          ...dataLayoutMain,
          skip: skip,
        }
      : null;
  const { data: dataViewMore } = useFetchArticleList(payloadArtViewMore, 5);
  const [dataViewMores, setDataViewMore] = useState<Article[]>([]);
  useEffect(() => {
    if (dataViewMore) {
      setDataViewMore((prev) => [...prev, ...dataViewMore]);
    }
  }, [dataViewMore]);
  return (
    <div id="BlockFoot">
      <SectionTitle
        title={dataLayoutMain?.title}
        className="mb-5 max-xl:mt-5"
      />
      <GridWrapper className="max-lg:flex-col-reverse">
        <div className="col-span-8">
          {posts &&
            posts?.map((item, index) => {
              return (
                <div key={item?.id || index}>
                  <ArticleCustomCard
                    className="col-span-4 line-clamp-3 items-center max-md:flex-col"
                    dataArticle={item}
                    titleStyle="heading-3"
                    dateStyle="body-3 text-grey-bold"
                    cateStyle="body-3 uppercase text-grey-bold"
                    width={795}
                    styleImg="w-full"
                    height={166}
                    hasSapo={true}
                    hasCate={true}
                    hasDate={true}
                    sapoStyle="line-clamp-4 body-3 text-grey-bold"
                  />
                  {index !== posts?.length - 1 && (
                    <hr className="my-3 text-grey-line" />
                  )}
                </div>
              );
            })}
          {dataViewMores &&
            dataViewMores?.map((item: Article, index: number) => {
              return (
                <ArticleCustomCard
                  className="col-span-4 mt-5 line-clamp-3 items-center max-md:flex-col"
                  dataArticle={item}
                  titleStyle="heading-3"
                  dateStyle="body-3 text-grey-bold"
                  cateStyle="body-3 uppercase text-grey-bold"
                  width={795}
                  height={166}
                  hasSapo={true}
                  hasCate={true}
                  hasDate={true}
                  styleImg="w-full"
                  sapoStyle="line-clamp-4 body-3 text-grey-bold"
                />
              );
            })}
          <>
            <ViewMoreButton
              skip={skip}
              dataLayout={dataLayoutMain}
              handleViewMore={handleViewMore}
            />
          </>
        </div>
        <div className="col-span-4">
          <ListArticleSide
            posts={dataSideTop}
            hasModifiedFirstPost={true}
            title="mới"
          />
          <div className=" border border-black h-fit mt-4  py-[30px] px-[40px]">
            {dataLayoutSide?.title && (
              <h4 className="heading-2 block mb-4">{dataLayoutSide?.title}</h4>
            )}
            <div className="flex flex-col gap-5">
              {dataSide &&
                dataSide?.map((item, index) => {
                  return (
                    <ArticleMini
                      className="col-span-4 rounded-2xl"
                      key={item?.id || index}
                      titleStyle="body-3 text-black line-clamp-3"
                      dataArticle={item}
                      hasRadius={true}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </GridWrapper>
    </div>
  );
};

export default BlockFoot;
