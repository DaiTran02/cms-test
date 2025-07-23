import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { PropsGlobal } from '@/interface/propsGlobal';
import { formatArticleDate } from '@/utils/Format';
import { getPostDetailUrl } from '@/utils/utilitiesHandling';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import IconTypeArticle from '../IconTypeArticle';
import ModelPopupVideo from '../ModelPopupVideo';

const ArticleCard = ({
  dataArticle,
  hasDate = true,
  hasCate = true,
  hasSapo = false,
  titleStyle = 'heading-4',
  dateStyle,
  cateStyle,
  subtitleStyle,
  sapoStyle,
  align,
  className,
  hasImg = true,
  width = 795,
  height = 466,
  iconType = 'left',
  catePrefix = false,
  styleImg,
}: // priority = false,
PropsGlobal) => {
  const [openPopupVideo, setOpenPopupVideo] = useState(false);
  const handleCloseModelPopup = (e: any) => {
    e.preventDefault();
    setOpenPopupVideo(false);
  };
  return (
    <div id="artCard" className={`relative ${className}`}>
      {dataArticle?.type == 'Video' ? (
        <div
          className="relative overflow-hidden 
          rounded-none border-none cursor-pointer"
          onClick={(e) => {
            if (dataArticle?.type == 'Video') {
              e.stopPropagation();
              e.preventDefault();
              setOpenPopupVideo(true);
            }
          }}
        >
          {hasImg && (
            <AspectRatio ratio={16 / 9}>
              {process.env.NEXT_PUBLIC_IMAGE_NEXTJS === 'true' ? (
                <Image
                  width={width}
                  height={height}
                  // priority={priority}
                  src={dataArticle?.featuredImage || '/images/logo_vl_art.png'}
                  alt="Vinh Long"
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1024px) 760px"
                  style={{ aspectRatio: 16 / 9 }}
                  // loading={priority == true ? 'eager' : 'lazy'}
                />
              ) : (
                <img
                  width={width}
                  height={height}
                  src={
                    dataArticle?.featuredMedia?.resolutions?.medium?.uri ||
                    dataArticle?.featuredImage ||
                    '/images/logo_vl_art.png'
                  }
                  alt="Vinh Long"
                  className="w-full h-full object-cover"
                  sizes="
              (max-width: 1024px) 760px,
            "
                  style={{ aspectRatio: 16 / 9 }}
                />
              )}
              <IconTypeArticle
                post={dataArticle}
                className={
                  iconType == 'align'
                    ? 'absolute top-[50%] left-1/2 -translate-[50%] z-20'
                    : 'absolute bottom-0 right-0  z-20 '
                }
                type={dataArticle?.type || ''}
                styleImg={iconType == 'align' ? 'w-[50px]' : 'w-[22px]'}
              />
            </AspectRatio>
          )}
        </div>
      ) : (
        <Link
          className="block"
          href={`${
            dataArticle?.type &&
            dataArticle?.alias &&
            getPostDetailUrl(
              dataArticle?.type,
              dataArticle?.alias,
              dataArticle?.id,
              dataArticle?.shortId
            )
          } `}
        >
          {hasImg && (
            <AspectRatio
              className="relative min-w-[231px]: overflow-hidden 
          rounded-none border-none"
              ratio={16 / 9}
            >
              {process.env.NEXT_PUBLIC_IMAGE_NEXTJS === 'true' ? (
                <Image
                  width={width}
                  height={height}
                  src={dataArticle?.featuredImage || '/images/logo_vl_art.png'}
                  alt="Vinh Long"
                  className="w-full h-full object-cover"
                  // layout="responsive"
                  sizes="(max-width: 1024px) 760px,"
                  style={{ aspectRatio: 16 / 9 }}
                />
              ) : (
                <img
                  width={width}
                  height={height}
                  src={
                    dataArticle?.featuredMedia?.resolutions?.medium?.uri ||
                    dataArticle?.featuredImage ||
                    '/images/logo_vl_art.png'
                  }
                  alt="Vinh Long"
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1024px) 760px"
                  style={{ aspectRatio: 16 / 9 }}
                />
              )}
              <IconTypeArticle
                post={dataArticle}
                className={
                  iconType == 'align'
                    ? 'absolute top-[50%] left-1/2 -translate-[50%] z-20'
                    : 'absolute bottom-0 right-0  z-20 '
                }
                type={dataArticle?.type || ''}
                styleImg={iconType == 'align' ? 'w-[50px]' : 'w-[22px]'}
              />
            </AspectRatio>
          )}
        </Link>
      )}
      <Link
        className="block mt-3 min-h-[42px]"
        href={`${
          dataArticle?.type &&
          dataArticle?.alias &&
          getPostDetailUrl(
            dataArticle?.type,
            dataArticle?.alias,
            dataArticle?.id,
            dataArticle?.shortId
          )
        } `}
      >
        <div
          className={`${twMerge(
            titleStyle,
            align === 'center' && 'text-center'
          )}`}
        >
          <div
            className="h-auto line-clamp-2 "
            // href={`${
            //   dataArticle?.type &&
            //   dataArticle?.alias &&
            //   getPostDetailUrl(
            //     dataArticle?.type,
            //     dataArticle?.alias,
            //     dataArticle?.id,
            //     dataArticle?.shortId
            //   )
            // } `}
          >
            {/* <IconTypeArticle type={dataArticle?.type} /> */}
            <h4> {dataArticle?.title}</h4>
          </div>
        </div>

        {(hasCate || hasDate) && (
          <div
            className={twMerge(
              'flex gap-2 items-center mt-2',
              align === 'center' && 'justify-center',
              subtitleStyle
            )}
          >
            {hasDate && (
              <div
                className={dateStyle || 'body-3 min-w-[70px] text-grey-bold'}
              >
                {dataArticle?.publicationTime &&
                  formatArticleDate(dataArticle?.publicationTime)}
              </div>
            )}
            {hasDate &&
              hasCate &&
              ((catePrefix && dataArticle?.category?.categoryName) ||
                (!catePrefix && dataArticle?.penName)) && (
                <div className="dot shrink-0"></div>
              )}
            {hasCate && (
              <div
                className={cateStyle || 'body-3 line-clamp-1 text-grey-bold'}
              >
                {catePrefix
                  ? dataArticle?.category?.categoryName
                  : dataArticle?.penName?.trim()}
              </div>
            )}
          </div>
        )}

        {hasSapo && (
          <div className={twMerge('mt-2 text-[#7b7b7b]', sapoStyle)}>
            {dataArticle?.sapo || dataArticle?.excerpt}
          </div>
        )}
      </Link>

      {openPopupVideo && (
        <ModelPopupVideo
          closeModel={handleCloseModelPopup}
          postMedia={dataArticle?.postMedia}
        />
      )}
    </div>
  );
};

export default ArticleCard;
