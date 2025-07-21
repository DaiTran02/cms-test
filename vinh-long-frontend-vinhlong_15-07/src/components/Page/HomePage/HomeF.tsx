import ArticleCustomCard from '@/components/Articles/ArticleCustomCard';
import GridThreeCol from '@/components/LayoutGrid/GridThreeCol';
import GridWrapper from '@/components/LayoutGrid/GridWrapper';
import SectionTitle from '@/components/SectionTitle';
import ListArticleSideMini from '@/components/SideRight/ListArticleSideMini';
import type { PropsGlobal } from '@/interface/propsGlobal';
import SlideTwoArticle from '../Home/SlideTwoArticle';

const HomeF = ({ posts, dataLayout, className }: PropsGlobal) => {
  if (!posts?.length) {
    return null;
  }
  return (
    <div id={`${dataLayout?.sectionName}`} className={`${className}`}>
      <SectionTitle
        cateAlias={dataLayout?.cateAlias}
        title={dataLayout?.title}
        className="mb-4"
      />
      <GridWrapper>
        <SlideTwoArticle className="col-span-9" posts={posts} />
        <div className="col-span-3">
          {posts?.slice(5, 10)?.map((item, index) => {
            return (
              <div key={item?.id}>
                <ArticleCustomCard
                  isReverse={true}
                  dataArticle={item}
                  width={125}
                  height={70}
                />
                {index !== posts?.slice(5, 10)?.length - 1 && (
                  <hr className="my-3 text-grey-line" />
                )}
              </div>
            );
          })}
        </div>
      </GridWrapper>
    </div>
  );
};

export default HomeF;
