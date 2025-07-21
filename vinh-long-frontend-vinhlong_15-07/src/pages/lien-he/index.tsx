import Container from '@/components/Container/Container';
import MainLayout from '@/components/MainLayout';
import TitleCatePage from '@/components/SectionTitle/TitleCatePage';
import SEO from '@/components/Seo';
import { useFetchWidget, useFetchWidgetSlot } from '@/hooks/useWidget';
import { fetchWidgetBanner } from '@/Services/mediaService';

const ContactPage = ({ dataServer }: { dataServer: any }) => {
  const { data: dataWidgetSlot } = useFetchWidgetSlot('Contact_Page');
  const { data: dataWidget } = useFetchWidget(dataWidgetSlot?.useWidget);
  const dateCate = { name: 'Liên hệ' };

  return (
    <MainLayout dataHeader={dataServer?.bannerheader}>
      <SEO dataCate={dateCate} />
      <Container>
        <TitleCatePage title="Liên Hệ" className="mb-7" />
        <div
          className="content-render content-detail-art"
          dangerouslySetInnerHTML={{ __html: dataWidget?.content }}
        ></div>
      </Container>
    </MainLayout>
  );
};

export default ContactPage;
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
