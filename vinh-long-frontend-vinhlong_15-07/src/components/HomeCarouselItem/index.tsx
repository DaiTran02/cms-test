import type { PropsGlobal } from '@/interface/propsGlobal';
import ArticleCard from '../Articles/ArticleCard';
import GridThreeCol from '../LayoutGrid/GridThreeCol';
import GridWrapper from '../LayoutGrid/GridWrapper';

const CarouselItemHomeG = ({ posts }: PropsGlobal) => {
  if (!posts) {
    return null;
  }
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-5">
      {posts?.length > 0 &&
        posts?.map((item, index) => {
          return (
            <ArticleCard
              titleStyle="heading-4"
              hasCate={false}
              hasDate={false}
              key={index}
              dataArticle={item}
            />
          );
        })}
    </div>
  );
};

export default CarouselItemHomeG;
