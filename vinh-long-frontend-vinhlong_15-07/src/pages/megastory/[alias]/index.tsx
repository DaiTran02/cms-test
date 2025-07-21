import ArtRelatedFoot from '@/components/ArtRelatedFoot';
import Container from '@/components/Container/Container';
import MainLayout from '@/components/MainLayout';
import { MediaArtItem } from '@/components/MediaArtItem';
import SectionTitle from '@/components/SectionTitle';
import SEO from '@/components/Seo';
import { useFetchArticleList, useFetchDetailArticle } from '@/hooks/useArticle';
import { useFetchCategory } from '@/hooks/useCategory';
import type { Category } from '@/interface/category';
import { fetchServerArticleDetail } from '@/Services/articleService';
import { fetchServerCategoryList } from '@/Services/categoryService';
import { fetchLayoutPage } from '@/Services/layoutPage';
import { fetchWidgetBanner } from '@/Services/mediaService';
import { transformBlocks } from '@/utils/utilitiesHandling';
import DetailArtSection from './DetailArtSection';
import GridWrapper from '@/components/LayoutGrid/GridWrapper';
import AdBanners from '@/components/AdBanners';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Comments from '@/components/Comments';

const DetailPage = ({ dataServer }: { dataServer: any }) => {
  if (!dataServer) {
    return <>loading....</>;
  }
  const dataLayout = dataServer?.dataSections?.BlockHead;
  const dataLayout_Foot = dataServer?.dataSections?.BlockFoot;

  const [paramsAlias, setParamsAlias] = useState<{
    detailAlias: string;
    preview: boolean;
  } | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (dataServer?.dataDetail?.id) {
      setParamsAlias(null);
    } else if (searchParams) {
      const previewParam = searchParams.get('preview');
      const detailAlias =
        pathname?.split('/')[pathname?.split('/')?.length - 1];
      setParamsAlias({
        detailAlias: detailAlias || '',
        preview: previewParam === 'true',
      });
    }
  }, [pathname, searchParams, dataServer?.dataDetail?.id]);

  //bài viết xem trước client
  const { data: detailArtReview } = useFetchDetailArticle(
    paramsAlias,
    paramsAlias?.preview
  );
  const finalDataDetail =
    (dataServer?.dataDetail?.id && dataServer?.dataDetail) || detailArtReview;

  const { data: dataBlockFoot } = useFetchArticleList(
    dataLayout_Foot?.BlockFoot_Side,
    12
  );
  const payloadRelatedArt = {
    ...dataLayout_Foot?.BlockFoot_Side,
    cateId:
      finalDataDetail?.relatedArticles[0] ||
      finalDataDetail?.category?.categoryId,
    notIncludeArticleIds: finalDataDetail?.id,
  };
  const { data: dataArtRelated } = useFetchArticleList(payloadRelatedArt, 1);
  const { data: dataCate } = useFetchCategory(
    finalDataDetail?.category?.categoryId || finalDataDetail?.alterCateIds
  );
  return (
    <MainLayout dataHeader={dataServer?.bannerheader}>
      {finalDataDetail && <SEO dataArticle={finalDataDetail} />}
      <Container>
        {/* <GridWrapper> */}
        {/* <div className="col-span-9"> */}
        <SectionTitle title={dataServer?.dataCate?.name} className="mb-5" />
        {finalDataDetail && (
          <>
            <DetailArtSection
              dataCate={dataCate}
              dataDetail={finalDataDetail}
            />
            <Comments />
          </>
        )}
        <ArtRelatedFoot dataArticle={dataArtRelated && dataArtRelated[0]} />
        <div className="mt-7">
          <SectionTitle
            className="mb-5"
            lineUnderTitle={true}
            title={dataLayout_Foot?.BlockFoot_Side?.title}
          />
          {dataBlockFoot && (
            <GridWrapper>
              <MediaArtItem
                className="col-span-3"
                posts={dataBlockFoot?.slice(0, 3)}
              />
              <MediaArtItem
                className="col-span-3"
                posts={dataBlockFoot?.slice(3, 6)}
              />
              <MediaArtItem
                className="col-span-3"
                posts={dataBlockFoot?.slice(6, 9)}
              />
              <MediaArtItem
                className="col-span-3"
                posts={dataBlockFoot?.slice(9, 12)}
              />
            </GridWrapper>
          )}
        </div>
        <div className="flex gap-5 justify-center mt-3">
          <AdBanners
            className="w-full h-full max-w-[295px]"
            nameAds="Mega_Foot_A"
          />
          <AdBanners
            className="w-full h-full max-w-[295px]"
            nameAds="Mega_Foot_B"
          />
          <AdBanners
            className="w-full h-full max-w-[295px]"
            nameAds="Mega_Foot_C"
          />
        </div>
      </Container>
    </MainLayout>
  );
};

export default DetailPage;
export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
export async function getStaticProps({ params }: { params: any }) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);
    const res = await fetchLayoutPage('MegaStoryDetailPage', controller.signal);
    clearTimeout(timeout);
    if (!res?.status) {
      throw new Error('Failed to fetch');
    }
    const listCate = await fetchServerCategoryList();
    if (params?.alias && params?.alias != 'favicon.ico') {
      const isSpecialPage = listCate?.some(
        (item: Category) => item?.alias == params?.alias
      );
      if (isSpecialPage) {
        return {
          notFound: true,
        };
      }
    }
    const dataTerm = res?.result?.blocks;
    const dataSections = dataTerm && transformBlocks(dataTerm);
    const bannerheader = await fetchWidgetBanner('Header_banner');

    const dataDetail =
      params?.alias !== 'favicon.ico' &&
      (await fetchServerArticleDetail(params?.alias));
    const dataServer = {
      bannerheader: bannerheader || {},
      dataLayout: res?.result,
      dataSections: dataSections,
      dataDetail: dataDetail || {},
    };

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
