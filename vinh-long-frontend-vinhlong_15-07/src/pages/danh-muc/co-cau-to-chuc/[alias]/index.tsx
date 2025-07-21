import Container from '@/components/Container/Container';
import { ArticleStyle } from '@/components/DetailHead';
import MainLayout from '@/components/MainLayout';
import ScSlideFourArt from '@/components/Page/HomePage/ScSlideFourArt';
import TitleCatePage from '@/components/SectionTitle/TitleCatePage';
import SEO from '@/components/Seo';
import { useFetchArticleList } from '@/hooks/useArticle';
import type { Category } from '@/interface/category';
import type { Article } from '@/interface/propsGlobal';
import { fetchServerArticleDetail } from '@/Services/articleService';
import { fetchServerCategoryList } from '@/Services/categoryService';
import { fetchLayoutPage } from '@/Services/layoutPage';
import { fetchWidgetBanner } from '@/Services/mediaService';
import { transformBlocks } from '@/utils/utilitiesHandling';
const Biography = ({ dataServer }: { dataServer: any }) => {
  const dataArt: Article = dataServer?.dataDetail;
  const listQuery = {
    tagIds: dataArt?.tags?.toString(),
  };
  const { data: listArtTags } = useFetchArticleList(listQuery, 10);
  return (
    <MainLayout dataHeader={dataServer?.bannerheader}>
      {dataArt && <SEO dataArticle={dataArt} />}
      <Container>
        <TitleCatePage title={dataArt?.excerpt || dataArt?.title || ''} />
        <div className="relative">
          <div className="mt-5">
            <ArticleStyle
              className="content-render spc relative px-[107px] pt-[30px]
               bg-[#ffffff] z-10 rounded-[30px] max-md:px-5 content-detail-art"
              dangerouslySetInnerHTML={{
                __html: dataArt?.postContent || '',
              }}
            ></ArticleStyle>
            <>{dataArt?.copyright && <>Nguồn: {dataArt?.copyright}</>}</>
          </div>
          <div>
            <div className="rounded-[20px] max-w-[400px] w-full mx-auto border border-red-primary mb-7">
              <h4 className="heading-2 text-center uppercase py-4 text-red-primary">
                Tin hoạt động
              </h4>
            </div>
            {listArtTags && listArtTags?.length >= 0 && (
              <ScSlideFourArt posts={listArtTags} />
            )}
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default Biography;
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
