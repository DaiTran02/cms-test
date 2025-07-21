import { memo } from 'react';
import Link from 'next/link';
// import { IoPlayCircleOutline } from 'react-icons/io5';
// import { IoPauseCircleOutline } from 'react-icons/io5';

// import utils
// import { formatArticleDate } from '@/utils/dateFormat';
import { getPostDetailUrl } from '@/utils/utilitiesHandling';

// import hooks
// import usePodcastContext from '@/hooks/usePodcastContext';
import { twMerge } from 'tailwind-merge';
// import IconTypeArticle from '@/components/Icons/IconTypeArticle';
import Image from 'next/image';
import type { Article } from '@/interface/propsGlobal';
import { formatArticleDate } from '@/utils/Format';
import IconTypeArticle from '../IconTypeArticle';

const PodcastCard = ({
  post,
  titleStyle,
  dateStyle,
  cateStyle,
  preview = true,
  className,
  width = 295,
  height = 295,
}: {
  post?: Article;
  titleStyle?: string;
  dateStyle?: string;
  cateStyle?: string;
  preview?: boolean;
  className?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <Link
      href={
        (post?.type &&
          post?.alias &&
          post?.id &&
          post?.shortId &&
          getPostDetailUrl(post?.type, post?.alias, post?.id, post?.shortId)) ||
        ''
      }
      id="podcast-art-A"
      className={className}
    >
      <div className="">
        <div>
          {process.env.NEXT_PUBLIC_IMAGE_NEXTJS === 'true' ? (
            <Image
              width={width}
              height={height}
              className="w-full object-cover rounded-[20px] "
              src={
                post?.featuredMedia?.resolutions?.medium.uri ||
                post?.featuredImage ||
                '/images/logo_vl_art.png'
              }
              alt={post?.featuredMedia?.alt || 'nong thon viet'}
              style={{
                aspectRatio: '1/1',
                //   opacity: assignedPost?.id === post.id ? '0.5' : '1',
              }}
              loading="lazy"
            />
          ) : (
            <img
              width={width}
              height={height}
              className="w-full object-cover rounded-[20px] "
              src={
                post?.featuredMedia?.resolutions?.medium.uri ||
                post?.featuredImage ||
                '/images/logo_vl_art.png'
              }
              alt={post?.featuredMedia?.alt || 'nong thon viet'}
              style={{
                aspectRatio: '1/1',
                //   opacity: assignedPost?.id === post.id ? '0.5' : '1',
              }}
              loading="lazy"
            />
          )}
        </div>
      </div>

      {/* subtitle */}
      <div className="flex justify-between items-center mb-[10px] mt-5">
        <div className="">
          {/* cateName */}
          <div className={twMerge('mb-1 uppercase text-[#7b7b7b]', cateStyle)}>
            {post?.category?.categoryName}
          </div>

          {/* date */}
          <div className={twMerge('text-[#7b7b7b]', dateStyle)}>
            {post?.publicationTime && formatArticleDate(post?.publicationTime)}
          </div>
        </div>
        <div>
          <img
            className="w-[40px]"
            srcSet="/images/icons/circle.png 2x"
            alt=""
          />
        </div>
      </div>

      {/* title */}
      <div className={titleStyle}>
        <h3 className="heading-4 ">
          <IconTypeArticle className="inline-block mr-1" type={post?.type} />
          {post?.title}
        </h3>
      </div>
    </Link>
  );
};

export default memo(PodcastCard);
