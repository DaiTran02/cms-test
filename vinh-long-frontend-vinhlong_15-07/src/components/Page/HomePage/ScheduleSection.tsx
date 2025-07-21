import GridWrapper from '@/components/LayoutGrid/GridWrapper';
import SectionTitle from '@/components/SectionTitle';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useFetchScheduleCurrentWeek } from '@/hooks/useScheduleWork';
import { getTimePeriod } from '@/utils/Format';
import { getDaysOfWeekVi } from '@/utils/utilitiesHandling';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import React from 'react';
const ScheduleSection = ({ className }: { className?: string }) => {
  const today = new Date();
  const currentYear = today?.getFullYear();
  // const week = getWeekNumber(today);
  const { data: dataScheduleCurrentWeek } = useFetchScheduleCurrentWeek();
  const listDayOfWeek = getDaysOfWeekVi(
    currentYear,
    dataScheduleCurrentWeek?.numberWeek
  );
  const listDateHasContent = dataScheduleCurrentWeek?.dates?.filter(
    (item: any, index: number) => {
      const date = listDayOfWeek[index]?.dateToMap;
      const list = item?.[date]?.length;
      if (list > 0) {
        return item;
      }
    }
  );
  return (
    <div id="sc-schedule" className={`block ${className}`}>
      <GridWrapper className="mt-7 mb-4">
        <SectionTitle
          cateAlias="lich-lam-viec"
          title={'Lịch làm việc'}
          className="col-span-7"
        />
        <div className="col-span-5 whitespace-normal flex gap-2 items-center justify-evenly heading-3 max-md:text-14">
          <span className="uppercase">
            Tuần:{' '}
            {
              <span className="py-[2px] ml-2 px-1 bg-red-primary text-white max-md:text-12">
                {dataScheduleCurrentWeek?.numberWeek}
              </span>
            }
          </span>
          <span className="inline-block">
            Từ ngày:
            <span className="py-[2px] ml-2 px-2 bg-red-primary text-white max-md:text-12">
              {dataScheduleCurrentWeek?.fromDate}
            </span>
          </span>
          <span>
            Đến:{' '}
            <span className="py-[2px] ml-2 px-1 bg-red-primary text-white max-md:text-12">
              {dataScheduleCurrentWeek?.toDate}
            </span>
          </span>
        </div>
      </GridWrapper>

      <div className=" overflow-x-auto">
        <Link
          href={`/danh-muc/lich-lam-viec?week=${dataScheduleCurrentWeek?.numberWeek}&year=${currentYear}`}
          className="block border border-[#d3d3d3] min-w-[768px]"
        >
          <div
            className="grid grid-cols-12 bg-[#ededed] text-center heading-4 
        border-b-[2px] border-[#d3d3d3]"
          >
            <div className="col-span-2 border-r-[2px] py-[6px] border-[#d3d3d3]">
              Thứ, ngày
            </div>
            <div className="col-span-6 border-r-[2px] py-1 border-[#d3d3d3]">
              Nội dung
            </div>
            <div className="col-span-4 py-1">
              Thành phần Thường trực Tỉnh ủy tham dự
            </div>
          </div>

          <div className="">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
              opts={{
                align: 'start',
                loop: true,
              }}
              orientation="vertical"
              className="w-full"
            >
              <CarouselContent className="h-[180px] w-full m-0">
                {listDateHasContent &&
                  listDateHasContent?.map((item: any, index: number) => {
                    const date = listDayOfWeek[index]?.dateToMap;
                    const dateRender = listDayOfWeek[index];
                    const dataDetail = item?.[date];
                    return (
                      <CarouselItem
                        key={dataDetail?.id || index}
                        className="p-0"
                      >
                        <div className="grid grid-cols-12 border-b border-[#d3d3d3] items-center h-full bg-white rounded-md text-sm transition body-2 text-[#000]">
                          <div className="px-4 py-2 col-span-2 border-r-[2px] border-[#d3d3d3] text-center heading-4 text-black h-full flex-col flex justify-center">
                            <div>
                              <div>{dateRender?.day}</div>
                              <div className="font-normal">
                                {dateRender?.date}
                              </div>
                            </div>
                          </div>
                          <div className="py-2 col-span-6 h-full border-r-[2px] border-[#d3d3d3] space-y-1">
                            {dataDetail?.map((event: any, i: number) => {
                              const heightClass =
                                dataDetail?.length === 1
                                  ? 'h-full'
                                  : dataDetail?.length === 2
                                  ? 'h-1/2'
                                  : 'h-1/3';
                              return (
                                <div
                                  key={i}
                                  className={`px-4 flex items-center ${
                                    i !== dataDetail?.length - 1 &&
                                    'border-b-[2px] border-[#d3d3d3]'
                                  }
                              ${heightClass}
                            `}
                                >
                                  {event?.allDay === false ? (
                                    <p className="line-clamp-2 ">
                                      {event?.start && (
                                        <span className="font-bold">
                                          * {getTimePeriod(event?.start)}:{' '}
                                        </span>
                                      )}
                                      <i>
                                        {event?.start
                                          ?.slice(0, 5)
                                          ?.replace(':', ' giờ ')
                                          ?.replace(' 00', '')}{' '}
                                        {event?.end &&
                                          'đến ' +
                                            event?.end
                                              ?.slice(0, 5)
                                              ?.replace(':', ' giờ ')
                                              ?.replace(' 00', '')}
                                      </i>{' '}
                                      <span className="block py-[2px]">
                                        {event?.content}
                                      </span>
                                    </p>
                                  ) : (
                                    <p>
                                      <span className="font-bold mb-[3px]">
                                        * Cả ngày{' '}
                                      </span>
                                      <span className="block">
                                        {event?.content}
                                      </span>
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          <div
                            className={`py-2 heading-4 font-normal text-[#000] col-span-4 space-y-1 h-full`}
                          >
                            {dataDetail?.map((event: any, i: number) => {
                              const heightClass =
                                dataDetail?.length === 1
                                  ? 'h-full'
                                  : dataDetail?.length === 2
                                  ? 'h-1/2'
                                  : 'h-1/3';

                              return (
                                <div
                                  key={i}
                                  className={`px-4 flex items-center justify-evenly line-clamp-3 flex-col ${
                                    i !== dataDetail?.length - 1 &&
                                    'border-b-[2px] border-[#d3d3d3]'
                                  }
                                ${heightClass}
                            `}
                                  dangerouslySetInnerHTML={{
                                    __html: event?.attendees,
                                  }}
                                ></div>
                              );
                            })}
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })}
                {listDateHasContent?.length <= 0 && (
                  <p className="block p-4">
                    <>Lịch chưa có bản cập nhật mới nhất!</>
                  </p>
                )}
              </CarouselContent>
            </Carousel>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(ScheduleSection);
