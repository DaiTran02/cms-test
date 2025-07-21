import ArticleCard from '@/components/Articles/ArticleCard';
import Container from '@/components/Container/Container';
import SectionTitle from '@/components/SectionTitle';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import styled from 'styled-components';

import type { Article, PropsGlobal } from '@/interface/propsGlobal';
import Autoplay from 'embla-carousel-autoplay';
import React, { useEffect } from 'react';
import type { QueryType } from '@/interface/queryType';
import ButtonNextSlide from '@/components/ButtonNextSlide';
const DIV = styled.div`
  transform: translateX(-50%);
  right: 50%;
`;
const SlideFourCol = ({
  posts,
  dataLayout,
  autoSurf = false,
  className,
}: {
  posts?: Article[];
  dataLayout?: QueryType;
  autoSurf?: boolean;
  className?: string;
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

  if (!posts) return null;
  return (
    <div
      id={`${dataLayout?.sectionName}-SlideFourCol`}
      className={`${className}`}
    >
      {/* <Container> */}
      <SectionTitle
        className="mb-5"
        cateAlias={dataLayout?.cateAlias}
        title={dataLayout?.title}
      />
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
          {posts &&
            posts?.map((item, index) => {
              return (
                <CarouselItem
                  key={item?.id}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div key={item?.id || index}>
                    <ArticleCard titleStyle="heading-4" dataArticle={item} />
                  </div>
                </CarouselItem>
              );
            })}
        </CarouselContent>
      </Carousel>

      <ButtonNextSlide
        nextSlide={nextSlide}
        className="w-full mt-5 justify-center"
        count={count}
        current={current}
      />
      {/* </Container> */}
    </div>
  );
};

export default SlideFourCol;
