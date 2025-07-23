import type { PropsGlobal } from '@/interface/propsGlobal';
import { formatArticleDate } from '@/utils/Format';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import IconTypeArticle from '../IconTypeArticle';
import Link from 'next/link';
import { getPostDetailUrl } from '@/utils/utilitiesHandling';
import ModelPopupVideo from '../ModelPopupVideo';
import { useState } from 'react';

const ArticleCustomCard = ({
  dataArticle,
  className,
  titleStyle = 'heading-4',
  width,
  height,
  hasDate = false,
  hasCate = false,
  hasSapo = false,
  dateStyle = 'body-2 uppercase text-grey',
  cateStyle = 'body-2 uppercase text-grey',
  subtitleStyle,
  sapoStyle,
  align,
  iconType = 'left',
  hiddenIcon = false,
  styleImg,
  isReverse,
}: PropsGlobal) => {
  const [openPopupVideo, setOpenPopupVideo] = useState(false);
  const handleCloseModelPopup = (e: any) => {
    e.preventDefault();
    setOpenPopupVideo(false);
  };
  return (
    <div
      className={`flex gap-4 overflow-hidden ${className} ${
        isReverse ? 'flex-row-reverse' : ''
      }`}
    >
      {dataArticle?.type == 'Video' ? (
        <div
          onClick={(e) => {
            if (dataArticle?.type == 'Video') {
              e.stopPropagation();
              e.preventDefault();
              setOpenPopupVideo(true);
            }
          }}
          className={`relative flex rounded-none cursor-pointer
           max-w-[295px] max-h-[166px] max-md:max-h-full max-md:max-w-full border-none 
           ${!width && 'w-[125px]'} w-[${width}px] h-[${height}px] 
         ${styleImg}`}
        >
          {process.env.NEXT_PUBLIC_IMAGE_NEXTJS === 'true' ? (
            <Image
              width={width || 125}
              height={height || 70}
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

          {!hiddenIcon && (
            <IconTypeArticle
              className={
                iconType == 'align'
                  ? 'absolute top-[50%] left-1/2 -translate-[50%] z-20 '
                  : 'absolute bottom-0 right-0  z-20 '
              }
              type={dataArticle?.type || ''}
              styleImg={iconType == 'align' ? 'w-[50px]' : 'w-[22px]'}
            />
          )}
        </div>
      ) : (
        <Link
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
          className={`relative flex rounded-none
           max-w-[295px]  max-h-[166px] max-md:max-h-full max-md:max-w-full border-none 
           ${!width && 'w-[125px]'} w-[${width}px] h-[${height}px] 
         ${styleImg}`}
        >
          {process.env.NEXT_PUBLIC_IMAGE_NEXTJS === 'true' ? (
            <Image
              width={width || 125}
              height={height || 70}
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

          {!hiddenIcon && (
            <IconTypeArticle
              className={
                iconType == 'align'
                  ? 'absolute top-[50%] left-1/2 -translate-[50%] z-20 '
                  : 'absolute bottom-0 right-0  z-20 '
              }
              type={dataArticle?.type || ''}
              styleImg={iconType == 'align' ? 'w-[50px]' : 'w-[22px]'}
            />
          )}
        </Link>
      )}
      <div className="flex-1">
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
          <h4 className={`${twMerge(titleStyle)} line-clamp-3`}>
            {dataArticle?.title}
          </h4>
        </Link>
        {(hasCate || hasDate) && (
          <div
            className={twMerge(
              'flex gap-2 items-center mt-2',
              align === 'center' && 'justify-center',
              subtitleStyle
            )}
          >
            {hasDate && (
              <div className={dateStyle}>
                {dataArticle?.publicationTime &&
                  formatArticleDate(dataArticle?.publicationTime)}
              </div>
            )}
            {hasDate && hasCate && <div className="dot"></div>}
            {hasCate && (
              <div className={cateStyle}>
                {dataArticle?.category?.categoryName ||
                  dataArticle?.penName?.trim()}
              </div>
            )}
          </div>
        )}

        {hasSapo && (
          <div className={twMerge('mt-2 text-[#7b7b7b] ', sapoStyle)}>
            {dataArticle?.sapo || dataArticle?.excerpt}
          </div>
        )}
      </div>
      {openPopupVideo && (
        <ModelPopupVideo
          closeModel={handleCloseModelPopup}
          postMedia={dataArticle?.postMedia}
        />
      )}
    </div>
  );
};

export default ArticleCustomCard;
