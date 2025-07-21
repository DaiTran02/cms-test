import ArticleCard from '@/components/Articles/ArticleCard';
import GridFourCol from '@/components/LayoutGrid/GridFourCol';
import SectionTitle from '@/components/SectionTitle';
import type { PropsGlobal } from '@/interface/propsGlobal';

const FourColArt = ({ posts, dataLayout, className }: PropsGlobal) => {
  if (!posts || posts.length === 0) return null;
  return (
    <div
      id={`${dataLayout?.sectionName}-fourColArt` || ''}
      className={`${className}`}
    >
      <SectionTitle title={dataLayout?.title || ''} className="mb-4" />
      <GridFourCol>
        {posts?.slice(0, 4).map((item, index) => (
          <ArticleCard titleStyle="heading-4" key={index} dataArticle={item} />
        ))}
      </GridFourCol>
    </div>
  );
};

export default FourColArt;
