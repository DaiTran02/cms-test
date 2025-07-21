import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import React from 'react';
import { DataBannerExternal } from '../../../../public/apiTemp/dataTempSliderExternal';
import SectionTitle from '@/components/SectionTitle';

const SliderBannerExternal = ({
  autoSurf = false,
  className,
  titleReplace,
}: {
  autoSurf?: boolean;
  className?: string;
  titleReplace?: string;
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className={`${className} pt-7 relative`}>
      {titleReplace && (
        <SectionTitle className="mt-7 mb-5" title={titleReplace} />
      )}
      <Carousel
        setApi={setApi}
        plugins={
          autoSurf == true
            ? [
                Autoplay({
                  delay: 5000,
                }),
              ]
            : []
        }
      >
        <CarouselContent>
          {DataBannerExternal &&
            DataBannerExternal?.map((item, index) => {
              return (
                <CarouselItem
                  key={item?.id || index}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Link href={item?.alias} target="_blank">
                    <img
                      width={333}
                      height={100}
                      src={item?.src || ''}
                      alt={item?.alt || 'vinh-long'}
                    />
                  </Link>
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselPrevious className="bg-red-primary rounded-none mb-3 text-[24px] text-white font-bold w-8 h-8 mr-2" />
        <CarouselNext className="bg-red-primary rounded-none mb-3 text-[24px] text-white font-bold w-8 h-8" />
      </Carousel>
    </div>
  );
};

export default SliderBannerExternal;
