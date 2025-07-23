import { useFetchAds } from '@/hooks/useAds';
import type { MediaType } from '@/interface/mediaType';
import type { Article } from '@/interface/propsGlobal';
import { useFetchMediaById } from '@/Services/ClientServices/media';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AdsBanner = ({
  className,
  nameAds,
  width = 700,
  height = 600,
  dataImage,
  tagetBlank = false,
}: {
  className?: string;
  nameAds?: string;
  width?: number;
  height?: number;
  dataImage?: any;
  tagetBlank?: boolean;
}) => {
  const { data: dataAds, isLoading: loadingAdsSlot } = useFetchAds(
    nameAds || ''
  );
  const { data: media, isLoading } = useFetchMediaById(
    dataAds?.rotator[0]?.mediaId
  );
  return (
    <Link
      href={
        dataAds?.rotator[0]?.destination ||
        (dataImage && dataImage[0]?.dataAds?.destination) ||
        '/'
      }
      target={tagetBlank ? '_blank' : ''}
      className={`block ${className}`}
    >
      {(media?.featuredMedia?.resolutions?.medium?.uri ||
        media?.uri ||
        dataImage) && (
        <>
          <img
            width={width}
            height={height}
            src={
              media?.featuredMedia?.resolutions?.uri ||
              media?.uri ||
              dataImage[0]?.dataMedia.resolutions?.uri ||
              (dataImage && dataImage[0]?.dataMedia?.uri) ||
              ''
            }
            className="h-full w-full"
            alt={
              media?.alt ||
              (dataImage && dataImage[0]?.dataMedia?.alt) ||
              'vinhlong'
            }
          />
        </>
      )}
    </Link>
  );
};

export default React.memo(AdsBanner);
