import React, { useState, useEffect, useCallback } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { Thumb } from './EmblaCarouselThumbsButton';
import type { Article } from '@/interface/propsGlobal';
import Image from 'next/image';
import type { MediaType } from '@/interface/mediaType';

type PropType = {
  slides?: MediaType[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);
  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {slides &&
            slides?.map((item, index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__number min-h-[600px]">
                  {process.env.NEXT_PUBLIC_IMAGE_NEXTJS === 'true' ? (
                    <Image
                      width={1000}
                      height={800}
                      alt={item?.alt || 'Vinh Long dcs'}
                      src={
                        item?.resolutions?.medium?.uri ||
                        item?.uri ||
                        '/images/logo_vl_art.png'
                      }
                    />
                  ) : (
                    <img
                      width={1000}
                      height={800}
                      alt={item?.alt || 'Vinh Long dcs'}
                      src={item?.resolutions?.medium?.uri || item?.uri || ''}
                    />
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container min-h-[166px]">
            {slides &&
              slides.map((item, index) => (
                <Thumb
                  key={index}
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  index={index}
                  imageSrc={item?.resolutions?.medium?.uri || item?.uri || ''}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
