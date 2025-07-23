import dynamic from 'next/dynamic';

import Container from '@/components/Container/Container';
import MainLayout from '@/components/MainLayout';
import SliderBannerExternal from '@/components/Page/Home/SliderBannerExternal';
import SEO from '@/components/Seo';
import { useFetchArticleList } from '@/hooks/useArticle';
import { useFetchDocxList } from '@/hooks/useDocx';
import { fetchServerArticleList } from '@/Services/articleService';
import { fetchLayoutPage } from '@/Services/layoutPage';
import { fetchWidgetBanner } from '@/Services/mediaService';
import { transformBlocks } from '@/utils/utilitiesHandling';
import { IsDisplayInPage } from '../../public/apiTemp/controlLayoutSc';
// Page Sections
const HomeA = dynamic(() => import('@/components/Page/HomePage/HomeA'), {
  loading: () => <p></p>,
  ssr: true,
});
const HomeE = dynamic(() => import('@/components/Page/HomePage/HomeE'), {
  loading: () => <p></p>,
  ssr: false,
});
const HomeF = dynamic(() => import('@/components/Page/HomePage/HomeF'), {
  loading: () => <p></p>,
  ssr: false,
});
const HomeH = dynamic(() => import('@/components/Page/HomePage/HomeH'), {
  loading: () => <p></p>,
  ssr: false,
});

const HomeI = dynamic(() => import('@/components/Page/HomePage/HomeI'), {
  loading: () => <p></p>,
  ssr: false,
});
const HomeN = dynamic(() => import('@/components/Page/HomePage/HomeN'), {
  loading: () => <p></p>,
  ssr: false,
});
const HomeT = dynamic(() => import('@/components/Page/HomePage/HomeT'), {
  loading: () => <p>Đang tải HomeS...</p>,
  ssr: false,
});
const ScMedia = dynamic(() => import('@/components/Page/HomePage/ScMedia'), {
  loading: () => <p></p>,
  ssr: false,
});
const ScheduleSection = dynamic(
  () => import('@/components/Page/HomePage/ScheduleSection'),
  {
    loading: () => <p></p>,
    ssr: false,
  }
);

// Ads
const AdsBanner = dynamic(() => import('@/components/AdBanners'), {
  loading: () => <p></p>,
  ssr: false,
});

const CivilSevant = dynamic(
  () => import('@/components/Page/HomePage/CivilSevant'),
  {
    loading: () => <p></p>,
    ssr: false, // Thêm ssr: false nếu component client-only
  }
);

const ScSlideFourArt = dynamic(
  () => import('@/components/Page/HomePage/ScSlideFourArt'),
  {
    loading: () => <p></p>,
    ssr: false,
  }
);

const SectionTab = dynamic(
  () => import('@/components/Page/HomePage/SectionTab'),
  {
    loading: () => <p></p>,
    ssr: false,
  }
);

const ScDocx = dynamic(() => import('@/components/Page/HomePage/ScDocx'), {
  loading: () => <p></p>,
  ssr: false,
});

const ScAgency = dynamic(() => import('@/components/Page/HomePage/ScAgency'), {
  loading: () => <p>Đang tải HomeT...</p>,
  ssr: false,
});

const SlideFourCol = dynamic(
  () => import('@/components/Page/Home/SlideFourCol'),
  {
    loading: () => <p>Đang tải SlideFourCol...</p>,
    ssr: true,
  }
);

export default function Home({ dataServer }: any) {
  if (!dataServer?.dataSectionlayout) {
    console.log('dataSectionlayout fail :>> ');
  }
  const sections = dataServer?.dataSectionlayout;
  const { data: dataHomeD } = useFetchArticleList(
    sections?.HomeD?.HomeD_Main,
    10
  );
  const { data: dataHomeE } = useFetchArticleList(
    sections?.HomeE?.HomeE_Main,
    10
  );
  const { data: dataHomeF } = useFetchArticleList(
    sections?.HomeF?.HomeF_Main,
    9
  );

  const { data: dataHomeG } = useFetchArticleList(
    sections?.HomeG?.HomeG_Main,
    16
  );
  const { data: dataHomeH } = useFetchArticleList(
    sections?.HomeH?.HomeH_Main,
    6
  );
  const { data: dataHomeI } = useFetchArticleList(
    sections?.HomeI?.HomeI_Main,
    10
  );
  const { data: dataHomeJ1 } = useFetchArticleList(
    sections?.HomeJ?.HomeJ_1,
    12
  );
  const { data: dataHomeJ2 } = useFetchArticleList(
    sections?.HomeJ?.HomeJ_2,
    12
  );
  const { data: dataHomeJ3 } = useFetchArticleList(
    sections?.HomeJ?.HomeJ_3,
    12
  );

  const { data: dataHomeK } = useFetchArticleList(
    sections?.HomeK?.HomeK_Main,
    12
  );

  const { data: dataHomeL } = useFetchArticleList(
    sections?.HomeL?.HomeL_Main,
    10
  );
  const { data: dataHomeM } = useFetchArticleList(
    sections?.HomeM?.HomeM_Main,
    16
  );
  const { data: dataHomeN } = useFetchArticleList(
    sections?.HomeN?.HomeN_Main,
    10
  );
  const { data: dataHomeO } = useFetchArticleList(
    sections?.HomeO?.HomeO_Main,
    9
  );
  const { data: dataHomeP } = useFetchArticleList(
    sections?.HomeP?.HomeP_Main,
    9
  );
  const { data: dataHomeQ } = useFetchArticleList(
    sections?.HomeQ?.HomeQ_Main,
    10
  );
  const { data: dataHomeR1 } = useFetchArticleList(sections?.HomeR?.HomeR_1, 8);
  const { data: dataHomeR2 } = useFetchArticleList(sections?.HomeR?.HomeR_2, 8);
  const { data: dataHomeV1 } = useFetchArticleList(sections?.HomeV?.HomeV_1, 3);
  const { data: dataHomeV2 } = useFetchArticleList(sections?.HomeV?.HomeV_2, 3);

  const initScDocx = sections?.HomeS?.HomeS_Side;
  const payloadDocx = {
    limit: 5,
    skip: initScDocx?.skip,
  };
  const { data: dataDocxHomeS } = useFetchDocxList(payloadDocx);
  const { data: dataHomeT } = useFetchArticleList(
    sections?.HomeT?.HomeT_Main,
    9
  );
  const { data: dataHomeV3 } = useFetchArticleList(sections?.HomeV?.HomeV_3, 3);
  const { data: dataHomeV4 } = useFetchArticleList(sections?.HomeV?.HomeV_4, 3);
  return (
    <>
      <MainLayout dataHeader={dataServer?.bannerheader}>
        <SEO />
        <Container>
          {sections?.HomeA?.HomeA_Main?.isDisplayOnPage && (
            <HomeA
              posts={dataServer?.dataSectionA_Main}
              postsSide={dataServer?.dataSectionA_Side}
              dataLayoutMain={sections?.HomeA?.HomeA_Main}
              dataLayoutSide={sections?.HomeA?.HomeA_Side}
            />
          )}
          {IsDisplayInPage?.scheduleSection?.isDisplay && <ScheduleSection />}
          {sections?.HomeB?.HomeB_Main?.isDisplayOnPage && (
            <SlideFourCol
              className="mt-7"
              posts={dataServer?.dataSectionB_Main}
              dataLayout={sections?.HomeB?.HomeB_Main}
            />
          )}
          {/* banner ads*/}
          <AdsBanner className="mt-7" nameAds={'HomeB_Bottom'} />
          {/* <FourColArt /> */}

          {sections?.HomeC?.HomeC_Main?.isDisplayOnPage && (
            <SlideFourCol
              className="mt-7"
              posts={dataServer?.dataSectionC_Main}
              dataLayout={sections?.HomeC?.HomeC_Main}
            />
          )}
          {/* Lanh dao nha nuoc */}
          {IsDisplayInPage?.civilSevant?.isDisplay && (
            <CivilSevant
              titleReplace={IsDisplayInPage?.civilSevant?.titleReplace}
            />
          )}
          {/* <HomeD /> */}
          {sections?.HomeD?.HomeD_Main?.isDisplayOnPage && (
            <SlideFourCol
              className="mt-7"
              posts={dataHomeD}
              dataLayout={sections?.HomeD?.HomeD_Main}
            />
          )}
          {sections?.HomeE?.HomeE_Main?.isDisplayOnPage && (
            <HomeE
              className="mt-7"
              posts={dataHomeE}
              dataLayout={sections?.HomeE?.HomeE_Main}
            />
          )}
          {sections?.HomeF?.HomeF_Main?.isDisplayOnPage && (
            <HomeF
              className="mt-7"
              posts={dataHomeF}
              dataLayout={sections?.HomeF?.HomeF_Main}
            />
          )}
          {sections?.HomeG?.HomeG_Main?.isDisplayOnPage && (
            <ScSlideFourArt
              posts={dataHomeG}
              dataLayout={sections?.HomeG?.HomeG_Main}
            />
          )}
          {sections?.HomeH?.HomeH_Main?.isDisplayOnPage && (
            <HomeH
              posts={dataHomeH}
              dataLayoutMain={sections?.HomeH?.HomeH_Main}
              dataLayoutSide={sections?.HomeH?.HomeH_Side}
            />
          )}
          {sections?.HomeI?.HomeI_Main?.isDisplayOnPage && (
            <HomeI
              className="mt-7"
              posts={dataHomeI}
              dataLayoutMain={sections?.HomeI?.HomeI_Main}
              dataLayoutSide={sections?.HomeI?.HomeI_Side}
            />
          )}
          {sections?.HomeK?.HomeK_Main?.isDisplayOnPage && (
            <ScSlideFourArt
              posts={dataHomeK}
              dataLayout={sections?.HomeK?.HomeK_Main}
            />
          )}
          {/* <WidgetItem className="mt-7 tablegrid" widgetName="ListBanner_HomeL" /> */}
          {/* <CarouselExternalBanner /> */}
          {IsDisplayInPage?.sliderBannerExternal?.isDisplay && (
            <SliderBannerExternal
              className="mt-7"
              titleReplace={IsDisplayInPage?.sliderBannerExternal?.titleReplace}
            />
          )}

          {sections?.HomeL?.HomeL_Main?.isDisplayOnPage && (
            <ScSlideFourArt
              posts={dataHomeL}
              dataLayout={sections?.HomeL?.HomeL_Main}
            />
          )}
          {sections?.HomeM?.HomeM_Main?.isDisplayOnPage && (
            <ScSlideFourArt
              posts={dataHomeM}
              dataLayout={sections?.HomeM?.HomeM_Main}
            />
          )}
          {sections?.HomeN?.HomeN_Main?.isDisplayOnPage && (
            <HomeN
              className="max-xl:mt-7"
              posts={dataHomeN}
              dataLayout={sections?.HomeN?.HomeN_Main}
              dataLayoutSide={sections?.HomeN?.HomeN_Side}
            />
          )}
          {sections?.HomeO?.HomeO_Main?.isDisplayOnPage && (
            <ScSlideFourArt
              posts={dataHomeO}
              dataLayout={sections?.HomeO?.HomeO_Main}
            />
          )}
          {sections?.HomeP?.HomeP_Main?.isDisplayOnPage && (
            <ScSlideFourArt
              posts={dataHomeP}
              dataLayout={sections?.HomeP?.HomeP_Main}
            />
          )}
          {sections?.HomeQ?.HomeQ_Main?.isDisplayOnPage && (
            <HomeF
              className="mt-7"
              posts={dataHomeQ}
              dataLayout={sections?.HomeQ?.HomeQ_Main}
            />
          )}
          {sections?.HomeJ?.HomeJ_1?.isDisplayOnPage && (
            <ScMedia
              dataLayoutMain={sections?.HomeJ?.HomeJ_1}
              dataLayoutBlock2={sections?.HomeJ?.HomeJ_2}
              dataLayoutBlock3={sections?.HomeJ?.HomeJ_3}
              posts={dataHomeJ1}
              dataHomeBlock2={dataHomeJ2}
              dataHomeBlock3={dataHomeJ3}
            />
          )}
        </Container>
        <div>
          {/* home R */}
          {sections?.HomeR?.HomeR_1?.isDisplayOnPage && (
            <SectionTab
              dataLayoutMain={sections?.HomeR?.HomeR_1}
              dataLayoutTab={sections?.HomeR?.HomeR_2}
              posts={dataHomeR1}
              dataTab={dataHomeR2}
            />
          )}
        </div>
        <Container>
          {/*LIỆU - VĂN KIỆN ĐẢNG */}
          {sections?.HomeS?.HomeS_Main?.isDisplayOnPage && dataDocxHomeS && (
            <ScDocx
              className="mt-7"
              posts={dataDocxHomeS}
              dataLayoutMain={sections?.HomeS?.HomeS_Main}
              dataLayoutSide={sections?.HomeS?.HomeS_Side}
            />
          )}
          {sections?.HomeV?.HomeV_1?.isDisplayOnPage && (
            <ScMedia
              dataLayoutMain={sections?.HomeV?.HomeV_1}
              dataLayoutBlock2={
                sections?.HomeV?.HomeV_2 || sections?.HomeJ?.HomeJ_2
              }
              dataLayoutBlock3={sections?.HomeV?.HomeV_3}
              dataLayoutBlock4={sections?.HomeV?.HomeV_4}
              posts={dataHomeV1}
              dataHomeBlock2={dataHomeV2}
              dataHomeBlock3={dataHomeV3}
              dataHomeBlock4={dataHomeV4}
            />
          )}
          {sections?.HomeT?.HomeT_Main?.isDisplayOnPage && (
            <HomeT
              className="mt-7"
              posts={dataHomeT}
              dataLayout={sections?.HomeT?.HomeT_Main}
            />
          )}
          {IsDisplayInPage?.scAgency?.isDisplay && (
            <ScAgency className="mt-7" />
          )}
        </Container>
      </MainLayout>
    </>
  );
}
export async function getStaticProps() {
  try {
    const controller = new AbortController(); // tạo bộ điều khiển để hủy request nếu quá lâu
    const timeout = setTimeout(() => controller.abort(), 7000); // timeout 7 giây
    const res = await fetchLayoutPage('HomePage', controller.signal);
    clearTimeout(timeout);
    if (!res?.status) {
      console.log('res :>> ', res?.status);
      throw new Error('Failed to fetch');
    }
    const dataLayout = res?.result?.blocks;
    const dataSections = transformBlocks(dataLayout);
    const bannerheader = (await fetchWidgetBanner('Header_banner')) || {};
    const dataSectionA_Main =
      (dataSections?.HomeA?.HomeA_Main &&
        (await fetchServerArticleList(dataSections?.HomeA?.HomeA_Main, 3))) ||
      {};
    const dataSectionA_Side =
      (dataSections?.HomeA?.HomeA_Side &&
        (await fetchServerArticleList(dataSections?.HomeA?.HomeA_Side, 4))) ||
      {};
    const dataSectionB_Main =
      (dataSections?.HomeB?.HomeB_Main &&
        (await fetchServerArticleList(dataSections?.HomeB?.HomeB_Main, 8))) ||
      {};
    const dataSectionC_Main =
      (dataSections?.HomeC?.HomeC_Main &&
        (await fetchServerArticleList(dataSections?.HomeC?.HomeC_Main, 8))) ||
      {};
    const dataServer = JSON.parse(
      JSON.stringify({
        layoutPage: dataLayout,
        dataSectionA_Main: dataSectionA_Main,
        dataSectionA_Side: dataSectionA_Side,
        dataSectionlayout: dataSections,
        dataSectionB_Main: dataSectionB_Main,
        dataSectionC_Main: dataSectionC_Main,
        bannerheader: bannerheader,
      })
    );
    return {
      props: {
        dataServer: dataServer,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        dataServer: {},
      },
      revalidate: 30,
    };
  }
}
