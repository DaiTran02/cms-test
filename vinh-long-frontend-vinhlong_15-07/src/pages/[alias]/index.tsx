import ArtRelatedFoot from '@/components/ArtRelatedFoot';
import Comments from '@/components/Comments';
import Container from '@/components/Container/Container';
import GridWrapper from '@/components/LayoutGrid/GridWrapper';
import MainLayout from '@/components/MainLayout';
import SectionTitle from '@/components/SectionTitle';
import SEO from '@/components/Seo';
import ShareSocial from '@/components/ShareSocial';
import ListArticleSideMini from '@/components/SideRight/ListArticleSideMini';
import { useFetchArticleList, useFetchDetailArticle } from '@/hooks/useArticle';
import { useFetchCategory } from '@/hooks/useCategory';
import type { Category } from '@/interface/category';
import { fetchServerArticleDetail } from '@/Services/articleService';
import { fetchServerCategoryList } from '@/Services/categoryService';
import { fetchLayoutPage } from '@/Services/layoutPage';
import { fetchWidgetBanner } from '@/Services/mediaService';
import { transformBlocks } from '@/utils/utilitiesHandling';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import ListTag from '../../components/ListTag';
import DetailArtSection from './DetailArtSection';

const DetailPage = ({ dataServer }: { dataServer: any }) => {
  const dataLayout = dataServer?.dataSections?.BlockHead;
  const dataLayout_Foot = dataServer?.dataSections?.BlockFoot;
  const [paramsAlias, setParamsAlias] = useState<{
    detailAlias: string;
    preview: boolean;
  } | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: dataCate } = useFetchCategory(
    dataServer?.dataDetail?.category?.categoryId ||
      dataServer?.dataDetail?.alterCateIds
  );
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
  //bài viết side bên phải
  const payloadArtSideHead = {
    ...dataLayout?.BlockHead_Side,
    cateId:
      dataServer?.dataDetail?.category?.categoryId ||
      dataServer?.dataDetail?.alterCateIds,
    notIncludeArticleIds: dataServer?.dataDetail?.id,
  };
  const { data: dataSide } = useFetchArticleList(payloadArtSideHead, 5);
  //bài viết liên quan
  const payloadRelatedArt = {
    ...dataLayout_Foot?.BlockFoot_Side,
    cateId:
      dataServer?.dataDetail?.relatedArticles?.[0] ??
      detailArtReview?.relatedArticles?.[0] ??
      dataLayout_Foot?.BlockFoot_Side?.cateId,
    notIncludeArticleIds: dataServer?.dataDetail?.id,
  };
  const { data: dataSide_Foot } = useFetchArticleList(payloadRelatedArt, 1);
  const finalDetailArt = dataServer?.dataDetail?.id
    ? dataServer.dataDetail
    : detailArtReview;
  return (
    <MainLayout dataHeader={dataServer?.bannerheader}>
      {(dataServer?.dataDetail || detailArtReview) && (
        <SEO dataArticle={dataServer?.dataDetail ?? detailArtReview} />
      )}
      <Container>
        <GridWrapper>
          <div className="col-span-9">
            <SectionTitle title={dataServer?.dataCate?.name} className="mb-5" />
            <DetailArtSection dataCate={dataCate} dataDetail={finalDetailArt} />
            {dataSide_Foot?.length > 0 && (
              <ArtRelatedFoot dataArticle={dataSide_Foot[0]} />
            )}
            <ShareSocial className="mt-5 " />
            <ListTag
              tagIds={
                (finalDetailArt?.tags?.length > 0 && finalDetailArt?.tags) || ''
              }
            />
            <Comments />
          </div>
          <div className="col-span-3 side-sticky">
            <ListArticleSideMini
              posts={dataSide}
              titleStyle="mb-5"
              title={dataLayout?.BlockHead_Side?.title}
            />
          </div>
        </GridWrapper>
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
    const res = await fetchLayoutPage('DetailPage', controller.signal);
    clearTimeout(timeout);
    if (!res?.status) {
      throw new Error('Failed to fetch');
    }
    const listCate = await fetchServerCategoryList();
    if (
      params?.alias &&
      params?.alias != 'favicon.ico'
      // params?.alias == 'ban-do-hanh-chinh'
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
    const dataTerm = res?.result?.blocks;
    const dataSections = dataTerm && transformBlocks(dataTerm);
    const bannerheader = (await fetchWidgetBanner('Header_banner')) || {};
    const dataDetail =
      (params?.alias !== 'favicon.ico' &&
        (await fetchServerArticleDetail(params?.alias))) ||
      {};
    const dataServer = {
      dataLayout: res?.result,
      dataSections: dataSections,
      bannerheader: bannerheader,
      dataDetail: dataDetail,
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
