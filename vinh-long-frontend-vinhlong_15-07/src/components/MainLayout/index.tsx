import { AudioPlayerProvider } from '@/context/AudioPlayerContext';
import { useFetchCategoryList } from '@/hooks/useCategory';
import type { Article } from '@/interface/propsGlobal';
import Link from 'next/link';
import type { ReactNode } from 'react';
import AdBanners from '../AdBanners';
import Container from '../Container/Container';
import Footer from '../Footer';
import Header from '../Header';
import type { Category } from '@/interface/category';

const MainLayout = ({
  children,
  dataHeader,
}: {
  children: ReactNode;
  dataHeader?: Article;
}) => {
  const { data: dataHead } = useFetchCategoryList('Header');
  const { data: dataPopUup } = useFetchCategoryList('PopUp');
  const { data: dataFooter } = useFetchCategoryList('Footer');
  const { data: dataFull } = useFetchCategoryList();
  return (
    <AudioPlayerProvider>
      <Container>
        {dataHeader && (
          <Header
            dataCategory={dataFull}
            dataHead={dataHead}
            dataCatePopUp={dataPopUup}
            dataBanner={dataHeader}
          />
        )}
      </Container>
      <>{children}</>
      <Footer dataCategory={dataFooter} />
    </AudioPlayerProvider>
  );
};

export default MainLayout;
