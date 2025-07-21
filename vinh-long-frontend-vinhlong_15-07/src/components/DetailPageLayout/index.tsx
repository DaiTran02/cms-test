// import { useFetchCategoryList } from '@/hooks/useCategory';
// import type { Article, PropsGlobal } from '@/interface/propsGlobal';
// import AdsBanner from '../AdBanners';
// import Container from '../Container/Container';
// import Footer from '../Footer';
// import Header from '../Header';
// import GridWrapper from '../LayoutGrid/GridWrapper';
// import ListArticleSideMini from '../SideRight/ListArticleSideMini';
// import type { ReactNode } from 'react';

// const DetailPageLayout = ({
//   children,
//   posts,
//   titleSide,
//   dataHeader,
// }: {
//   children?: ReactNode;
//   posts?: Article[];
//   titleSide?: string;
//   dataHeader: any;
// }) => {
//   const { data } = useFetchCategoryList();

//   return (
//     <html lang="vi">
//       <Container>
//         {dataHeader && <Header dataCategory={data} dataHeader={dataHeader} />}
//       </Container>
//       <Container>
//         <GridWrapper>
//           <div className="col-span-8">{children}</div>
//           <div className="col-span-4 ">
//             <ListArticleSideMini
//               posts={posts}
//               title={titleSide}
//               titleStyle="mb-5"
//               width={125}
//               height={70}
//               className="mb-5"
//             />
//             <AdsBanner className="mb-5" />
//             <AdsBanner />
//           </div>
//         </GridWrapper>
//       </Container>
//       <Footer dataCategory={data} />
//     </html>
//   );
// };

// export default DetailPageLayout;
