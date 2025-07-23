import Container from '@/components/Container/Container';
import MainLayout from '@/components/MainLayout';
import TitleCatePage from '@/components/SectionTitle/TitleCatePage';
import SEO from '@/components/Seo';
import WidgetItem from '@/components/WidgetItem';
import { fetchWidgetBanner } from '@/Services/mediaService';

const TouristMap = ({ dataServer }: { dataServer: any }) => {
  const dateCate = { name: 'Bản đồ du lịch' };
  return (
    <MainLayout dataHeader={dataServer?.bannerheader}>
      <SEO dataCate={dateCate} />
      <Container className="mx-auto">
        <TitleCatePage title="Bản đồ du lịch" className="pb-7 bg-white " />
        <WidgetItem
          className="w-full h-full pointer-events-auto"
          widgetName="Travel_Map_VL"
        />
      </Container>
    </MainLayout>
  );
};

export default TouristMap;
export async function getStaticProps() {
  try {
    const bannerheader = (await fetchWidgetBanner('Header_banner')) || {};
    const dataServer = JSON.parse(
      JSON.stringify({
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
