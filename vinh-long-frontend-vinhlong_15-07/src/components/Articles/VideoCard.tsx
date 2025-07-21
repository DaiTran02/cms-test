import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { PropsGlobal } from '@/interface/propsGlobal';
import {
  formatArticleDate,
  formatDetailArticleDate,
  formatPodcastArticleDate,
  formatReadArticleDate,
  formatTapChiInArticleDate,
} from '@/utils/Format';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import IconTypeArticle from '../IconTypeArticle';
import { getPostDetailUrl } from '@/utils/utilitiesHandling';
import { useState } from 'react';
import ModelPopupVideo from '../ModelPopupVideo';

const VideoCard = ({
  dataArticle,
  hasDate = true,
  hasCate = true,
  hasSapo = false,
  titleStyle,
  dateStyle,
  cateStyle,
  subtitleStyle,
  sapoStyle,
  className,
  align,
  iconType = 'left',
  width = 295,
  height = 166,
}: PropsGlobal) => {
  const [openPopupVideo, setOpenPopupVideo] = useState(false);
  const handleCloseModelPopup = (e: any) => {
    e.preventDefault();
    setOpenPopupVideo(false);
  };
  if (!dataArticle?.type) return null;
  return (
    <div className={`${className} block cursor-pointer`}>
      {
        <AspectRatio
          className="relative overflow-hidden rounded-none border-none"
          ratio={16 / 9}
          onClick={(e) => {
            if (dataArticle?.type == 'Video') {
              e.stopPropagation();
              e.preventDefault();
              setOpenPopupVideo(true);
            }
          }}
        >
          {process.env.NEXT_PUBLIC_IMAGE_NEXTJS === 'true' ? (
            <Image
              width={width}
              height={height}
              src={
                dataArticle?.featuredMedia?.resolutions?.medium?.uri ||
                dataArticle?.featuredImage ||
                '/images/logo_vl_art.png'
              }
              alt="Image"
              className="w-full h-full object-cover"
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
              alt="Image"
              className="w-full h-full object-cover"
            />
          )}

          <IconTypeArticle
            post={dataArticle}
            className={
              iconType == 'align'
                ? 'absolute top-[50%] left-1/2 -translate-[50%] z-20 '
                : 'absolute bottom-0 right-0  z-20 '
            }
            type={dataArticle?.type || ''}
            styleImg={iconType == 'align' ? 'w-[50px]' : 'w-[22px]'}
          />
        </AspectRatio>
      }
      <Link
        href={
          (dataArticle?.type &&
            dataArticle?.alias &&
            dataArticle?.id &&
            dataArticle?.shortId &&
            getPostDetailUrl(
              dataArticle?.type,
              dataArticle?.alias,
              dataArticle?.id,
              dataArticle?.shortId
            )) ||
          ''
        }
      >
        {(hasCate || hasDate) && (
          <div
            className={twMerge(
              'flex gap-2 items-center mt-2 body-2',
              align === 'center' && 'justify-center',
              subtitleStyle
            )}
          >
            {dataArticle?.penName?.trim() &&
              `${dataArticle?.penName?.trim()} |`}
            {dataArticle?.publicationTime &&
              formatPodcastArticleDate(dataArticle?.publicationTime)}{' '}
          </div>
        )}

        <div className="mt-1 min-h-[42px]">
          <div
            className={`${twMerge(
              titleStyle,
              align === 'center' && 'text-center'
            )} `}
          >
            <div className="h-auto line-clamp-2">
              {/* <IconTypeArticle type={dataArticle?.type} /> */}
              <h4> {dataArticle?.title}</h4>
            </div>
          </div>

          {hasSapo && (
            <div className={twMerge('mt-2 text-[#7b7b7b]', sapoStyle)}>
              {dataArticle?.sapo || dataArticle?.excerpt}
            </div>
          )}
          {openPopupVideo && (
            <ModelPopupVideo
              closeModel={handleCloseModelPopup}
              postMedia={dataArticle?.postMedia}
            />
          )}
        </div>
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

export default VideoCard;
