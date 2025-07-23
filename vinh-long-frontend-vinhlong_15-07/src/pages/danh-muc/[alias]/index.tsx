import AdsBanner from '@/components/AdBanners';
import Container from '@/components/Container/Container';
import MainLayout from '@/components/MainLayout';
import TitleCatePage from '@/components/SectionTitle/TitleCatePage';
import { useFetchArticleList, useFetchDetailArticle } from '@/hooks/useArticle';
import {
  fetchServerCategoryId,
  fetchServerCategoryList,
} from '@/Services/categoryService';

import ArticleCard from '@/components/Articles/ArticleCard';
import ArticleCustomCard from '@/components/Articles/ArticleCustomCard';
import BlockHeadCatePage from '@/components/BlockHeadCatePage';
import ViewMoreButton from '@/components/Button/ViewMoreButton';
import DetailHead from '@/components/DetailHead';
import GridWrapper from '@/components/LayoutGrid/GridWrapper';
import SectionTitle from '@/components/SectionTitle';
import SEO from '@/components/Seo';
import { useFetchTagsList } from '@/hooks/useTags';
import type { Category } from '@/interface/category';
import type { Article } from '@/interface/propsGlobal';
import { fetchLayoutPage } from '@/Services/layoutPage';
import { fetchWidgetBanner } from '@/Services/mediaService';
import { transformBlocks } from '@/utils/utilitiesHandling';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SPECIAL_PATH } from '../../../../public/apiTemp/dataVinhLong/specialPath';
import BlockFoot from './BlockFoot';

const CatePageDynamic = ({ dataServer }: any) => {
  //section theo layout
  const dataLayoutHead = dataServer?.dataSections?.BlockHead;
  const dataLayoutMiddle = dataServer?.dataSections?.BlockMiddle;
  const dataLayoutFoot = dataServer?.dataSections?.BlockFoot;
  //trang chi tiết
  const params = { detailAlias: dataServer?.dataCate?.alias };
  // console.log('params :>> ', params);
  const { data: dataDetailArt } = useFetchDetailArticle(params);
  const payloadGetArtTags =
    dataDetailArt?.tags?.length > 0
      ? {
          ...dataLayoutFoot?.BlockFoot_Side,
          tagIds: dataDetailArt?.tags?.toString(),
          cateId: dataDetailArt?.category?.categoryId,
          notIncludeArticleIds: dataDetailArt?.id,
        }
      : null;
  const { data: listArtTags } = useFetchArticleList(payloadGetArtTags, 8);
  const [limit, setLimit] = useState<number>(0);
  const [skip, setSkip] = useState<number | null>(null);
  //get bài viết theo tags
  const path = useParams();
  const searchParams: any = useSearchParams();
  const tagId = searchParams.get('tagId');
  const paramstags = { limit: -1, skip: 0, tagIds: tagId };
  const { data: dataTags } = useFetchTagsList(paramstags);
  const payload = {
    ...dataLayoutHead?.BlockHead_Main,
    cateId: dataServer?.dataCate?.id,
    tagIds: tagId,
    cateAlias: dataServer?.dataCate?.alias,
  };

  //lấy bài viết theo layout
  const { data: dataBlockHead_Main } = useFetchArticleList(payload, 8);
  const listArtHasTags = dataBlockHead_Main?.filter(
    (item: Article) => item?.tags
  );
  const listTag = listArtHasTags?.map((item: Article) => {
    if (item?.tags && item?.tags?.length > 0 && item?.tags[0]) {
      return item?.tags[0];
    }
  });
  const listArtAvailable = listArtHasTags?.map((item: Article) => {
    if (item?.id && item?.id) {
      return item?.id;
    }
  });
  const payloadMiddle =
    params?.detailAlias !== 'thuong-truc-tinh-uy'
      ? {
          ...dataLayoutMiddle?.BlockMiddle_Main,

          cateId: dataServer?.dataCate?.id,
          cateAlias: dataServer?.dataCate?.alias,
          tagIds: tagId,
        }
      : {
          ...dataLayoutMiddle?.BlockMiddle_Main,
          cateId: '',
          skip: 0,
          cateAlias: dataServer?.dataCate?.alias,
          tagIds: listTag?.toString(),
          notIncludeArticleIds: listArtAvailable?.toString(),
        };
  const { data: dataBlockMiddle } = useFetchArticleList(payloadMiddle, 5);
  const { data: dataBlockFoot_Main } = useFetchArticleList(
    dataLayoutFoot?.BlockFoot_Main,
    4
  );
  const { data: dataBlockFoot_Side } = useFetchArticleList(
    dataLayoutFoot?.BlockFoot_Side,
    5
  );
  // const payloadArtViewMore =
  //   skip !== null
  //     ? {
  //         ...dataLayoutHead?.BlockHead_Main,
  //         skip: skip,
  //         cateId: dataServer?.dataCate?.id,
  //         cateAlias: dataServer?.dataCate?.alias,
  //         tagIds: tagId,
  //         notIncludeArticleIds: listArtAvailable?.toString(),
  //       }
  //     : null;
  // const { data: dataViewMore } = useFetchArticleList(payloadArtViewMore, 12);

  // const [dataViewMores, setDataViewMore] = useState<Article[]>([]);
  // useEffect(() => {
  //   if (dataViewMore) {
  //     setDataViewMore((prev) => [...prev, ...dataViewMore]);
  //   }
  // }, [dataViewMore]);
  // useEffect(() => {
  //   setLimit(0);
  //   setSkip(null);
  //   // setDataViewMore([]);
  // }, [path]);
  console.log(' listArtTags.length :>> ', listArtTags && listArtTags.length);
  return (
    <MainLayout dataHeader={dataServer?.bannerheader}>
      {dataServer?.dataCate && <SEO dataCate={dataServer?.dataCate} />}
      <Container>
        {!dataDetailArt ? (
          <>
            <TitleCatePage
              title={
                dataServer?.dataCate?.name || (dataTags && dataTags[0]?.name)
              }
              className="mb-7"
            />
            {dataBlockHead_Main?.length > 0 && (
              <>
                <BlockHeadCatePage
                  className="pb-5"
                  posts={dataBlockHead_Main}
                />
              </>
            )}
            <AdsBanner nameAds="CateNewsPage_Center" className="my-7" />
            <BlockFoot
              params={params?.detailAlias == 'thuong-truc-tinh-uy'}
              dataSideTop={dataBlockFoot_Main}
              dataSide={dataBlockFoot_Side}
              posts={dataBlockMiddle}
              dataLayoutMain={payloadMiddle}
              dataLayoutSide={dataLayoutFoot}
            />
          </>
        ) : (
          <>
            {dataDetailArt && (
              <GridWrapper>
                <DetailHead
                  dataDetail={dataDetailArt}
                  // hideComment={true}
                  styleTitle="text-red-primary"
                  className={`mb-7 ${
                    listArtTags?.length > 0 ? 'col-span-8' : 'col-span-12'
                  }`}
                />
                <div
                  className={`flex flex-col gap-5 ${
                    listArtTags?.length > 0 ? 'col-span-4' : 'side-sticky'
                  }`}
                >
                  {listArtTags?.length > 0 && (
                    <SectionTitle title="Bài viết mới" lineUnderTitle />
                  )}
                  {listArtTags &&
                    listArtTags?.length > 0 &&
                    listArtTags?.map((item: Article, index: number) => {
                      return (
                        <div key={item?.id || index}>
                          {item?.id !== dataDetailArt?.id && (
                            <ArticleCustomCard
                              hasCate={false}
                              height={70}
                              width={125}
                              titleStyle="font-normal"
                              hasDate={false}
                              dataArticle={item}
                            />
                          )}
                        </div>
                      );
                    })}
                </div>
              </GridWrapper>
            )}
          </>
        )}
      </Container>
    </MainLayout>
  );
};

export default CatePageDynamic;
export const getStaticPaths = async () => {
  const datapaths: any = [];
  const dataCate = await fetchServerCategoryList();

  const paths = dataCate
    .filter((item: any) => !SPECIAL_PATH.includes(item.alias))
    .map((item: any) => ({
      params: { alias: item.alias },
    }));
  return {
    paths: paths,
    fallback: 'blocking',
  };
};

export async function getStaticProps({ params }: { params: any }) {
  try {
    const controller = new AbortController(); //DetailPage
    const timeout = setTimeout(() => controller.abort(), 7000);
    const res = await fetchLayoutPage('NewsCatePage', controller.signal);
    clearTimeout(timeout);
    if (!res?.status) {
      throw new Error('Failed to fetch');
    }
    const dataTerm = res?.result?.blocks;
    const dataSections = dataTerm && transformBlocks(dataTerm);
    const listCate = await fetchServerCategoryList();
    const bannerheader = (await fetchWidgetBanner('Header_banner')) || {};
    if (
      params?.alias &&
      params?.alias != 'favicon.ico' &&
      params?.alias == 'lien-he'
    ) {
      const isSpecialPage = listCate?.some(
        (item: Category) => item?.alias == params?.alias
      );
      if (isSpecialPage) {
        return {
          notFound: true,
        };
      }
    }

    const dataCate =
      (params && (await fetchServerCategoryId(params?.alias))) || {};
    const dataServer = JSON.parse(
      JSON.stringify({
        dataSections: dataSections,
        dataCate: dataCate,
        bannerheader: bannerheader,
      })
    );
    return {
      props: { dataServer },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: { dataServer: {} },
      revalidate: 30,
    };
  }
}
