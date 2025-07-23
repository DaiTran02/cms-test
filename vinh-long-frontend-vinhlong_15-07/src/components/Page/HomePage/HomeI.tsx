import ArticleCard from '@/components/Articles/ArticleCard';
import GridWrapper from '@/components/LayoutGrid/GridWrapper';
import SectionTitle from '@/components/SectionTitle';
import ListArticleSide from '@/components/SideRight/ListArticleSide';
import type { PropsGlobal } from '@/interface/propsGlobal';
import SlideTwoArticle from '../Home/SlideTwoArticle';
import { List } from 'lucide-react';

const HomeI = ({
  posts,
  dataLayoutMain,
  dataLayoutSide,
  className,
}: PropsGlobal) => {
  if (!posts) {
    return null;
  }
  return (
    <div id={`${dataLayoutMain?.sectionName}`} className={`${className}`}>
      <SectionTitle
        cateAlias={dataLayoutMain?.cateAlias}
        title={dataLayoutMain?.title}
        className="mb-4"
      />
      <GridWrapper>
        <SlideTwoArticle
          isReverse={true}
          className="col-span-9"
          posts={posts}
        />

        <div className="col-span-3">
          <ListArticleSide
            title={dataLayoutSide?.title || ''}
            hasModifiedFirstPost={true}
            posts={posts?.slice(-3)}
          />
        </div>
      </GridWrapper>
    </div>
  );
};

export default HomeI;
