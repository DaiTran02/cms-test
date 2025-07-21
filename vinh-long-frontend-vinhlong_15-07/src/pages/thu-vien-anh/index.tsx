import Container from '@/components/Container/Container';
import EmblaCarousel from '@/components/EmblaCarousel';
import MainLayout from '@/components/MainLayout';
import TitleCatePage from '@/components/SectionTitle/TitleCatePage';
import { useFetchMediaList } from '@/hooks/useMedia';
import { fetchWidgetBanner } from '@/Services/mediaService';
import { usePathname } from 'next/navigation';
const imgArr = [
  'https://api.nongthonviet.com.vn/media/2025/05/15/6825f3f69f05e16ac88de403_chim-03_medium.jpg',
  'https://api.nongthonviet.com.vn/media/2025/05/19/682a9589e039aa29565e8636_cover_medium.jpg',
];

const AlbumImagePage = ({ dataServer }: { dataServer: any }) => {
  const path = usePathname()?.replace('/', '')?.toString();
  const options = {};
  const { data: dataMedia, error } = useFetchMediaList(path || '');
  return (
    <MainLayout dataHeader={dataServer?.bannerheader}>
      <Container>
        <TitleCatePage title="Thư viện ảnh" className="mb-7" />
        {dataMedia && <EmblaCarousel slides={dataMedia} options={options} />}
      </Container>
    </MainLayout>
  );
};

export default AlbumImagePage;
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
