import type { PropsGlobal } from '@/interface/propsGlobal';
import { formatArticleDate, formatPodcastArticleDate } from '@/utils/Format';
import { getPostDetailUrl } from '@/utils/utilitiesHandling';
import Link from 'next/link';
import ArticleCard from '../Articles/ArticleCard';
import SectionTitle from '../SectionTitle';
const ListArticleSide = ({
  className,
  posts,
  hasModifiedFirstPost,
  hasDate,
  title,
  hasTitle = true,
  hasBorder = false,
  titleCenter = false,
  hasImg = true,
}: PropsGlobal) => {
  if (!posts?.length) return null;
  const firstPost = posts[0];
  return (
    <div
      id="listArtSide"
      className={`${className} ${hasBorder && 'border py-3 px-5'}`}
    >
      {hasTitle && !titleCenter && (
        <SectionTitle className="mb-5" title={title || ''} />
      )}
      {hasTitle && titleCenter && (
        <SectionTitle
          lineUnderTitle={true}
          className=""
          title={title || 'Mới nhất'}
        />
      )}
      {/* Img */}
      {hasModifiedFirstPost && (
        <ArticleCard
          titleStyle="heading-4"
          hasImg={hasImg}
          className="image block border-b-[0.75px] border-[#393939]"
          hasDate={false}
          hasCate={false}
          hasSapo={hasImg ? true : false}
          dataArticle={firstPost}
          sapoStyle="mb-3 line-clamp-2"
        />
      )}

      {/* list */}
      <div className="list">
        {posts?.slice(1, posts?.length)?.map((post, index) => (
          <div
            className={`${
              index != posts?.length - 2
                ? 'border-b-[0.75px] py-3'
                : 'border-none  pt-3'
            } border-[#393939]`}
            key={post.id}
          >
            <Link
              href={`${
                (post?.type &&
                  post?.alias &&
                  getPostDetailUrl(
                    post?.type,
                    post?.alias,
                    post?.id,
                    post?.shortId
                  )) ||
                ''
              }`}
              className="line-clamp-3 heading-4"
            >
              {post.title}
            </Link>
            {hasDate && (
              <div className={'flex gap-2 items-center mt-2'}>
                {hasDate && (
                  <div className="body-mini uppercase max-w-[120px] line-clamp-1">
                    {/* {post?.publicationTime && formatTime(post?.publicationTime)} */}
                    {post?.penName || post?.category?.categoryName}
                    {/* {post?.publicationTime &&
                      formatPodcastArticleDate(post?.publicationTime)} */}
                  </div>
                )}
                {hasDate && (
                  <div className="">
                    <img src="images/icons/schedule.png" alt="" />
                  </div>
                )}
                {hasDate && (
                  <div className="body-mini">
                    {post?.publicationTime &&
                      formatArticleDate(post?.publicationTime)}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListArticleSide;
