import AdsBanner from '@/components/AdBanners';
import ArticleCard from '@/components/Articles/ArticleCard';
import GridWrapper from '@/components/LayoutGrid/GridWrapper';
import ListArticleSide from '@/components/SideRight/ListArticleSide';
import type { PropsGlobal } from '@/interface/propsGlobal';
import Image from 'next/image';

const HomeA = ({
  posts,
  postsSide,
  dataLayoutMain,
  dataLayoutSide,
}: PropsGlobal) => {
  return (
    <div id={dataLayoutMain?.sectionName}>
      <GridWrapper>
        <div className="col-span-9 gap-5">
          {posts && (
            <ArticleCard
              dataArticle={posts[0]}
              titleStyle="heading-1"
              className="mb-5"
              width={1095}
              height={503}
              align="center"
              iconType="align"
              catePrefix={true}
              priority={true}
            />
          )}
          <div className="grid grid-cols-2 gap-5 mt-5">
            {posts?.slice(1, 3).map((item, index: number) => (
              <ArticleCard
                width={438}
                height={246}
                titleStyle="heading-2"
                key={index}
                dataArticle={item}
                catePrefix={true}
              />
            ))}
          </div>
        </div>

        <div className="col-span-3">
          <ListArticleSide
            title={dataLayoutSide?.title}
            className="line-clamp-2"
            titleStyle="heading-4"
            posts={postsSide}
            hasModifiedFirstPost={true}
          />
          <AdsBanner nameAds="HomeA_Side" className="mt-5" />
        </div>
      </GridWrapper>
    </div>
  );
};

export default HomeA;
