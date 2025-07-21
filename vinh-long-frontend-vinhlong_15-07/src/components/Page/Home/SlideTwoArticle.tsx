import ArticleCard from '@/components/Articles/ArticleCard';
import ButtonNextSlide from '@/components/ButtonNextSlide';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import type { Article, PropsGlobal } from '@/interface/propsGlobal';
import type { QueryType } from '@/interface/queryType';
import Autoplay from 'embla-carousel-autoplay';
import React, { useEffect } from 'react';

const SlideTwoArticle = ({
  posts,
  dataLayout,
  isReverse,
  className,
  autoSurf,
}: {
  posts?: Article[];
  dataLayout?: QueryType;
  isReverse?: boolean;
  className?: string;
  autoSurf?: boolean;
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
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
    <div id={`SlideTwoArticle`} className={className}>
      <div
        className={`${
          isReverse ? 'flex-row-reverse' : ''
        } col-span-9 flex items-start justify-between gap-5 max-lg:flex-col`}
      >
        <div className="max-w-[610px] max-xl:max-w-full  w-full ">
          <ArticleCard
            titleStyle="heading-1"
            hasCate={true}
            hasDate={true}
            key={posts[0]?.id}
            dataArticle={posts[0]}
            width={610}
            height={343}
            align="center"
          />
        </div>
        <div className="flex-1">
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
              <CarouselItem className="flex flex-col gap-5">
                {posts?.slice(1, 3).map((item, index) => {
                  return (
                    <ArticleCard
                      className="max-xl:min-w-[295px]"
                      titleStyle="heading-4"
                      hasCate={false}
                      hasDate={false}
                      key={index}
                      dataArticle={item}
                    />
                  );
                })}
                {/* <CarouselItemHomeG posts={} /> */}
              </CarouselItem>
              <CarouselItem className="flex flex-col gap-5">
                {posts?.slice(3, 5).map((item, index) => {
                  return (
                    <ArticleCard
                      titleStyle="heading-4"
                      hasCate={false}
                      hasDate={false}
                      key={index}
                      dataArticle={item}
                    />
                  );
                })}
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
      </div>
    </div>
  );
};

export default SlideTwoArticle;
