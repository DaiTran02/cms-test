import VideoCard from '@/components/Articles/VideoCard';
import Container from '@/components/Container/Container';
import GridWrapper from '@/components/LayoutGrid/GridWrapper';
import MainLayout from '@/components/MainLayout';
import SectionTitle from '@/components/SectionTitle';
import SEO from '@/components/Seo';
import VideoPlay from '@/components/VideoPlay';
import { useFetchArticleList, useFetchDetailArticle } from '@/hooks/useArticle';
import { useFetchCategory } from '@/hooks/useCategory';
import type { Article } from '@/interface/propsGlobal';
import { fetchServerArticleDetail } from '@/Services/articleService';
import { useFetchMediaById } from '@/Services/ClientServices/media';
import { fetchLayoutPage } from '@/Services/layoutPage';
import { fetchWidgetBanner } from '@/Services/mediaService';
import { transformBlocks } from '@/utils/utilitiesHandling';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DetailVideo from '../../../components/DetailHead';

const DetailViewPage = ({ dataServer }: { dataServer: any }) => {
  const dataDetail: Article = dataServer?.dataDetail;
  const dataDetailSide = dataServer?.dataSections?.BlockHead?.BlockHead_Side;
  const payloadSide = {
    ...dataDetailSide,
    cateId: dataDetail?.category?.categoryId,
  }; //params cho các bài viết ở sidebar

  const { data: dataCate } = useFetchCategory(
    dataDetail?.category?.categoryId ?? ''
  );
  const { data: dataArtSide } = useFetchArticleList(payloadSide, 3);
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
  const { data: dataVideo } = useFetchMediaById(
    (dataDetail?.postMedia && dataDetail?.postMedia[0]?.file) ||
      finalDataDetail?.postMedia[0]?.file
  );
  return (
    <MainLayout dataHeader={dataServer?.bannerheader}>
      {dataServer?.dataDetail && <SEO dataArticle={finalDataDetail} />}
      <Container>
        <VideoPlay media={dataVideo} />

        <GridWrapper className="mt-7">
          <DetailVideo
            dataDetail={finalDataDetail}
            dataCate={dataCate}
            className="col-span-9 "
          />
          <div className="col-span-3 ">
            <SectionTitle
              className="mb-5"
              title={dataServer?.dataSections?.BlockHead?.BlockHead_Side?.title}
            />
            {dataArtSide?.length > 0 &&
              dataArtSide?.map((item: any, index: number) => (
                <VideoCard
                  className="mb-5"
                  dataArticle={item}
                  key={item?.id || index}
                />
              ))}
          </div>
        </GridWrapper>
      </Container>
    </MainLayout>
  );
};

export default DetailViewPage;
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
export async function getStaticProps({
  params,
}: {
  params: { alias: string };
}) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);
    const res = await fetchLayoutPage('SpecialDetailPage', controller.signal);
    clearTimeout(timeout);
    if (!res?.status) {
      throw new Error('Failed to fetch');
    }
    const dataTerm = res?.result?.blocks;
    const dataSections = dataTerm && transformBlocks(dataTerm);
    const dataDetail =
      (params?.alias && (await fetchServerArticleDetail(params?.alias))) || {};
    const bannerheader = (await fetchWidgetBanner('Header_banner')) || {};
    const dataServer = {
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
