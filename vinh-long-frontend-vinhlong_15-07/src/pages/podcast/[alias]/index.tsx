import VideoCard from '@/components/Articles/VideoCard';
import Container from '@/components/Container/Container';
import GridWrapper from '@/components/LayoutGrid/GridWrapper';
import MainLayout from '@/components/MainLayout';
import { useInView } from 'react-intersection-observer';

import PodcastBlockHead from '@/components/PodcastPage/PodcastBlockHead';
import SectionTitle from '@/components/SectionTitle';
import SEO from '@/components/Seo';
import { useFetchArticleList, useFetchDetailArticle } from '@/hooks/useArticle';
import { useFetchCategory } from '@/hooks/useCategory';
import { fetchServerArticleDetail } from '@/Services/articleService';
import { useFetchMediaById } from '@/Services/ClientServices/media';
import { fetchLayoutPage } from '@/Services/layoutPage';
import { fetchWidgetBanner } from '@/Services/mediaService';
import { transformBlocks } from '@/utils/utilitiesHandling';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DetailHead from '../../../components/DetailHead';

const DetailPodCastPage = ({ dataServer }: { dataServer: any }) => {
  const dataDetail = dataServer?.dataDetail;
  const dataDetailSide = dataServer?.dataSections?.BlockHead?.BlockHead_Side;
  const [podcastScroll, setPodcastScroll] = useState(false);

  const payloadSide = {
    ...dataDetailSide,
    cateId: dataDetail?.category?.categoryId,
  };
  const { data: dataCate } = useFetchCategory(dataDetail?.category?.categoryId);
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
  const finalDataDetail = (dataDetail?.id && dataDetail) || detailArtReview;
  const { data: audioData } = useFetchMediaById(
    finalDataDetail && finalDataDetail?.postMedia[0]?.file
  );
  const { ref: audioPlayerRef, inView } = useInView({
    initialInView: true,
  });
  return (
    <MainLayout dataHeader={dataServer?.bannerheader}>
      <SEO dataArticle={finalDataDetail} />
      <Container>
        {audioData && (
          <PodcastBlockHead
            ref={audioPlayerRef}
            imgSrc={
              finalDataDetail?.featuredMedia?.resolutions?.medium?.uri ||
              finalDataDetail?.featuredImage ||
              '/images/logo_vl_art.png'
            }
            cateName={finalDataDetail && finalDataDetail?.cateName}
            date={finalDataDetail && finalDataDetail?.date}
            title={finalDataDetail && finalDataDetail?.title}
            alias={finalDataDetail && finalDataDetail?.alias}
            type={finalDataDetail && finalDataDetail?.type}
            mediaSrc={audioData.uri}
          />
        )}
        <GridWrapper className="mt-7 max-lg:gap-7">
          <DetailHead
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
                  className="mb-5 "
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

export default DetailPodCastPage;
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
