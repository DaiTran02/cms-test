import Link from 'next/link';
import ArticleCard from '../Articles/ArticleCard';
import SectionTitle from '../SectionTitle';
import type { PropsGlobal } from '@/interface/propsGlobal';
import { formatArticleDate } from '@/utils/Format';
import ArticleCustomCard from '../Articles/ArticleCustomCard';
const ListArticleSideMini = ({
  className,
  posts,
  hasModifiedFirstPost,
  hasDate,
  title,
  hasTitle = true,
  hasBorder = false,
  titleCenter = false,
  titleStyle,
}: PropsGlobal) => {
  if (!posts?.length) return null;
  return (
    <>
      {hasTitle && <SectionTitle title={`${title}`} className={titleStyle} />}
      <div className={`flex flex-col gap-4 ${className}`}>
        {posts?.length > 0 &&
          posts?.map((item, index) => {
            return (
              <div key={index + 3}>
                <ArticleCustomCard
                  dataArticle={item}
                  titleStyle="heading-4"
                  className={`${index + 1 != posts?.length ? 'mb-4' : ''}`}
                />
                {index + 1 != posts?.length ? <hr className="text-grey" /> : ''}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ListArticleSideMini;
