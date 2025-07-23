import ArticleCard from '@/components/Articles/ArticleCard';
import Container from '@/components/Container/Container';
import GridWrapper from '@/components/LayoutGrid/GridWrapper';
import MainLayout from '@/components/MainLayout';
import TitleCatePage from '@/components/SectionTitle/TitleCatePage';
import SEO from '@/components/Seo';
import { useFetchArticleList } from '@/hooks/useArticle';
import type { Article } from '@/interface/propsGlobal';
import { fetchLayoutPage } from '@/Services/layoutPage';
import { fetchWidgetBanner } from '@/Services/mediaService';
import { transformBlocks } from '@/utils/utilitiesHandling';

const MegastoryPage = ({ dataServer }: { dataServer: any }) => {
  if (!dataServer?.dataSections) {
    return null;
  }
  const blockHead = dataServer?.dataSections?.BlockHead;
  const detailHead_Side = useFetchArticleList(blockHead?.BlockHead_Main, 18);
  const dataCate = {
    name: blockHead?.BlockHead_Main?.cateName,
    alias: blockHead?.BlockHead_Main?.cateAlias,
  };
  return (
    <MainLayout dataHeader={dataServer?.bannerheader}>
      <SEO dataCate={dataCate} />
      <Container>
        <TitleCatePage
          title={blockHead?.BlockHead_Main?.title}
          className="mb-5"
        />
        <GridWrapper className="mb-5">
          {detailHead_Side?.data &&
            detailHead_Side?.data
              ?.slice(0, 2)
              .map((item: Article, index: number) => {
                return (
                  <div key={item?.id || index} className="col-span-6">
                    <ArticleCard
                      dataArticle={item}
                      width={286}
                      height={162}
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
          {detailHead_Side?.data &&
            detailHead_Side?.data
              ?.slice(2, detailHead_Side?.data?.length)
              .map((item: Article, index: number) => {
                return (
                  <div key={item?.id || index} className="col-span-3">
                    <ArticleCard
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
      </Container>
    </MainLayout>
  );
};

export default MegastoryPage;
export async function getStaticProps() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);
    const res = await fetchLayoutPage('MegaStoryCatePage', controller.signal);
    clearTimeout(timeout);
    if (!res?.status) {
      throw new Error('Failed to fetch');
    }
    const bannerheader = await fetchWidgetBanner('Header_banner');

    const dataTerm = res?.result?.blocks;
    const dataSections = transformBlocks(dataTerm);
    const dataServer = {
      dataSections: dataSections,
      bannerheader: bannerheader || {},
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
