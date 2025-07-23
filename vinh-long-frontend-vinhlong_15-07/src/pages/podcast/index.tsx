import PodcastCard from '@/components/Articles/PodcastCard';
import ViewMoreButton from '@/components/Button/ViewMoreButton';
import Container from '@/components/Container/Container';
import GridWrapper from '@/components/LayoutGrid/GridWrapper';
import MainLayout from '@/components/MainLayout';
import PodcastBlockHead from '@/components/PodcastPage/PodcastBlockHead';
import TitleCatePage from '@/components/SectionTitle/TitleCatePage';
import SEO from '@/components/Seo';
import { useFetchArticleList } from '@/hooks/useArticle';
import { useFetchCategory } from '@/hooks/useCategory';
import type { Article } from '@/interface/propsGlobal';
import { useFetchMediaById } from '@/Services/ClientServices/media';
import { fetchLayoutPage } from '@/Services/layoutPage';
import { fetchWidgetBanner } from '@/Services/mediaService';
import { transformBlocks } from '@/utils/utilitiesHandling';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const PodcastPage = ({ dataServer }: { dataServer: any }) => {
  const path = usePathname()?.replace('/', '');
  const { data: dataCate } = useFetchCategory(path || '');
  const [dataViewMores, setDataViewMore] = useState<Article[]>([]);
  const [limit, setLimit] = useState(8);
  const [skip, setSkip] = useState(0);
  const dataSectionMain = dataServer?.dataSections?.BlockHead?.BlockHead_Main;
  const payloadBlockMain = {
    ...dataSectionMain,
    cateId: dataCate?.id,
    skip: skip,
  };
  const { data } = useFetchArticleList(payloadBlockMain, limit);
  const handleViewMore = () => {
    setLimit(4);
    setSkip(limit + skip);
  };
  useEffect(() => {
    if (data) {
      setDataViewMore((prev) => [...prev, ...data]);
    }
  }, [data, dataCate]);
  const fileString = dataViewMores?.[0]?.postMedia?.[0]?.file
    ? dataViewMores[0].postMedia[0].file.toString()
    : '';
  const { data: audioData } = useFetchMediaById(fileString);
  const { ref: audioPlayerRef, inView } = useInView({
    initialInView: true,
  });
  return (
    <MainLayout dataHeader={dataServer?.bannerheader}>
      <SEO dataCate={dataCate} />
      <Container>
        <TitleCatePage title={dataCate?.name} className="mb-7" />
        {audioData && (
          <PodcastBlockHead
            className="mb-5"
            ref={audioPlayerRef}
            imgSrc={
              dataViewMores[0]?.featuredMedia?.resolutions?.medium?.uri ||
              dataViewMores[0]?.featuredImage ||
              '/images/logo_vl_art.png'
            }
            cateName={
              dataViewMores[0] && dataViewMores[0]?.category?.categoryName
            }
            date={dataViewMores[0] && dataViewMores[0]?.publicationTime}
            title={dataViewMores[0] && dataViewMores[0]?.title}
            alias={dataViewMores[0] && dataViewMores[0]?.alias}
            type={dataViewMores[0] && dataViewMores[0]?.type}
            mediaSrc={audioData.uri}
          />
        )}
        <GridWrapper>
          {dataViewMores &&
            dataViewMores
              ?.slice(1, dataViewMores?.length)
              .map((item: Article, index: number) => (
                <PodcastCard
                  key={item?.id || index}
                  post={item}
                  titleStyle="heading-3"
                  dateStyle="body-2 text-grey"
                  cateStyle="text-primary"
                  preview={true}
                  className="mb-5 col-span-3"
                />
              ))}
        </GridWrapper>

        <ViewMoreButton
          dataLayout={dataServer}
          skip={skip}
          handleViewMore={handleViewMore}
        />
      </Container>
    </MainLayout>
  );
};

export default PodcastPage;
export async function getStaticProps() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);
    const res = await fetchLayoutPage('PodcastCatePage', controller.signal);
    clearTimeout(timeout);
    if (!res?.status) {
      throw new Error('Failed to fetch');
    }
    const bannerheader = await fetchWidgetBanner('Header_banner');
    const dataTerm = res?.result?.blocks;
    const dataSections = transformBlocks(dataTerm);
    const dataServer = {
      dataSections: dataSections,
      bannerheader: bannerheader,
    };
    return {
      props: { dataServer },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: { dataServer: [] }, // Or fallback
    };
  }
}
