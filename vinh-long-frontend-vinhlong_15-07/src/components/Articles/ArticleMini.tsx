import type { Article, PropsGlobal } from '@/interface/propsGlobal';
import React from 'react';
import IconTypeArticle from '../IconTypeArticle';
import { getPostDetailUrl } from '@/utils/utilitiesHandling';
import Link from 'next/link';
import Image from 'next/image';

const ArticleMini = ({
  dataArticle,
  className,
  iconType = 'left',
  width = 100,
  height = 100,
  hasRadius = false,
  titleStyle = 'body-2',
}: {
  titleStyle?: string;
  dataArticle: Article;
  className?: string;
  iconType?: string;
  width?: number;
  height?: number;
  hasRadius?: boolean;
}) => {
  return (
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
      className={`text-justify ${className} flex items-start gap-5`}
    >
      <div className="relative w-[60px] h-[60px]">
        {process.env.NEXT_PUBLIC_IMAGE_NEXTJS === 'true' ? (
          <Image
            width={width}
            height={height}
            className={`w-full h-full object-cover${
              hasRadius ? ' rounded-[10px]' : ''
            }`}
            src={
              dataArticle?.featuredMedia?.resolutions?.medium?.uri ||
              dataArticle?.featuredImage ||
              '/images/logo_vl_art.png'
            }
            style={{ aspectRatio: '1/1' }}
            alt={dataArticle?.featuredMedia?.alt || 'Ving Long dcs'}
          />
        ) : (
          <img
            className={`w-full h-full object-cover${
              hasRadius ? ' rounded-[10px]' : ''
            }`}
            width={width}
            height={height}
            src={
              dataArticle?.featuredMedia?.resolutions?.medium?.uri ||
              dataArticle?.featuredImage ||
              '/images/logo_vl_art.png'
            }
            style={{ aspectRatio: '1/1' }}
            alt={dataArticle?.featuredMedia?.alt || 'Ving Long dcs'}
          />
        )}

        <IconTypeArticle
          className={
            iconType == 'align'
              ? 'absolute top-[50%] left-1/2 -translate-[50%] z-20 '
              : 'absolute bottom-0 right-0  z-20 '
          }
          type={dataArticle?.type || ''}
          styleImg={iconType == 'align' ? 'w-[50px]' : 'w-[22px]'}
        />
      </div>
      <div className={`flex-1 ${titleStyle}`}>
        <h5 className="">{dataArticle?.title}</h5>
      </div>
    </Link>
  );
};

export default ArticleMini;
