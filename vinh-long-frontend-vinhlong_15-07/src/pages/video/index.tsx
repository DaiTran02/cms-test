import VideoCard from '@/components/Articles/VideoCard';
import ViewMoreButton from '@/components/Button/ViewMoreButton';
import Container from '@/components/Container/Container';
import GridWrapper from '@/components/LayoutGrid/GridWrapper';
import MainLayout from '@/components/MainLayout';
import SectionTitle from '@/components/SectionTitle';
import TitleCatePage from '@/components/SectionTitle/TitleCatePage';
import SEO from '@/components/Seo';
import { useFetchArticleList } from '@/hooks/useArticle';
import type { Article } from '@/interface/propsGlobal';
import { fetchLayoutPage } from '@/Services/layoutPage';
import { fetchWidgetBanner } from '@/Services/mediaService';
import { transformBlocks } from '@/utils/utilitiesHandling';
import { useEffect, useState } from 'react';

const VideoPage = ({ dataServer }: { dataServer: any }) => {
  if (!dataServer?.dataSections) {
    return null;
  }
  const [listArtPage, setListArtPage] = useState<Article[]>([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(6);
  const blockHead = dataServer?.dataSections?.BlockHead;
  const payloadMain = blockHead?.BlockHead_Main?.cateId && {
    ...dataServer?.dataSections?.BlockHead,
    cateId: blockHead?.BlockHead_Main?.cateId,
    skip: skip,
  };
  const { data: dataHead_Main } = useFetchArticleList(payloadMain, limit);
  const handleViewMore = () => {
    setLimit(4);
    setSkip(limit + skip);
  };
  const dataCate = {
    alias: blockHead?.BlockHead_Main?.cateAlias,
    name: blockHead?.BlockHead_Main?.cateName,
  };
  useEffect(() => {
    if (dataHead_Main) {
      setListArtPage([...listArtPage, ...dataHead_Main]);
    }
  }, [dataHead_Main]);
  return (
    <MainLayout dataHeader={dataServer?.bannerheader}>
      <SEO dataCate={dataCate} />
      <Container>
        <TitleCatePage
          title={blockHead?.BlockHead_Main?.title}
          className="mb-5"
        />
        <GridWrapper className="mb-5">
          {listArtPage &&
            listArtPage?.slice(0, 2).map((item: Article, index: number) => {
              return (
                <div key={item?.id || index} className="col-span-6">
                  <VideoCard
                    dataArticle={item}
                    width={438}
                    height={246}
                    hasSapo={true}
                    hasCate={true}
                    iconType="align"
                    hasDate={true}
                    sapoStyle="line-clamp-3"
                    titleStyle="heading-3"
                  />
                </div>
              );
            })}
        </GridWrapper>
        <GridWrapper>
          {listArtPage &&
            listArtPage
              ?.slice(2, listArtPage?.length)
              .map((item: Article, index: number) => {
                return (
                  <div key={item?.id || index} className="col-span-3">
                    <VideoCard
                      subtitleStyle="body-2 text-grey"
                      dataArticle={item}
                      width={286}
                      height={162}
                      hasSapo={false}
                      hasCate={true}
                      className="col-span-3"
                      hasDate={true}
                      titleStyle="heading-3"
                    />
                  </div>
                );
              })}
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

export default VideoPage;
export async function getStaticProps() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);
    const res = await fetchLayoutPage('VideoCatePage', controller.signal);
    clearTimeout(timeout);
    if (!res?.status) {
      throw new Error('Failed to fetch');
    }
    const dataTerm = res?.result?.blocks;
    const dataSections = transformBlocks(dataTerm);
    const bannerheader = (await fetchWidgetBanner('Header_banner')) || {};
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
      props: { dataServer: [] },
      revalidate: 30,
    };
  }
}
