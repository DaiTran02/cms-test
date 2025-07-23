'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

import ArticleCard from '@/components/Articles/ArticleCard';
import CarouselItemHomeG from '@/components/HomeCarouselItem';
import GridWrapper from '@/components/LayoutGrid/GridWrapper';
import SectionTitle from '@/components/SectionTitle';
import type { Article } from '@/interface/propsGlobal';
import type { QueryType } from '@/interface/queryType';
import React, { useEffect, useState } from 'react';
import ButtonNextSlide from '@/components/ButtonNextSlide';
import Autoplay from 'embla-carousel-autoplay';
import type { EmblaCarouselType } from 'embla-carousel';

const ScSlideFourArt = ({
  posts,
  dataLayout,
  className,
  autoSurf = false,
}: {
  posts?: Article[];
  dataLayout?: QueryType;
  className?: string;
  autoSurf?: boolean;
}) => {
  const [current, setCurrent] = React.useState(0);

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [count, setCount] = React.useState(0);
  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap()); // ✅ bỏ +1
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap()); // ✅ bỏ +1
    });
  }, [api]);

  if (!posts) return <></>;
  const nextSlide = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <div id={`${dataLayout?.sectionName}-ScSlideFourArt`}>
      <SectionTitle
        title={dataLayout?.title}
        cateAlias={dataLayout?.cateAlias}
        className={`mt-7 mb-4 ${className}`}
      />

      <GridWrapper>
        <div className="col-span-6">
          <ArticleCard
            titleStyle="heading-1"
            key={posts[0]?.id}
            dataArticle={posts[0]}
            width={590}
            height={331}
            align="center"
          />
        </div>
        <div className="col-span-6">
          <Carousel
            plugins={
              autoSurf == true
                ? [
                    Autoplay({
                      delay: 5000,
                    }),
                  ]
                : []
            }
            setApi={setApi}
          >
            <CarouselContent>
              <CarouselItem>
                <CarouselItemHomeG posts={posts?.slice(1, 5)} />
              </CarouselItem>
              <CarouselItem>
                <CarouselItemHomeG posts={posts?.slice(5, 9)} />
              </CarouselItem>
              <CarouselItem>
                <CarouselItemHomeG posts={posts?.slice(9, 13)} />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
          <ButtonNextSlide
            nextSlide={nextSlide}
            className="w-full mt-5 justify-center"
            count={count}
            current={current}
          />
        </div>
      </GridWrapper>
    </div>
  );
};

export default ScSlideFourArt;
