import { getTimePeriod } from '@/utils/Format';
import React from 'react';

const TableSchedule = ({
  listDayOfWeek,
  dataScheduleCurrentWeek,
  className,
}: {
  className?: string;
  listDayOfWeek: any;
  dataScheduleCurrentWeek: any;
}) => {
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
    <>
      <div id="schedule" className={`block overflow-x-auto ${className}`}>
        <div className=" border-[#d3d3d3] min-w-[768px]">
          <div
            className="flex items-center bg-[#ededed] text-center heading-4 
        border border-collapse border-[#d3d3d3]"
          >
            <div className="w-[20%] p-5 border-r-[2px] border-[#d3d3d3]">
              Thứ, ngày
            </div>
            <div className="flex w-[80%] items-center">
              <div className="flex-1 p-5 border-r-[2px] border-[#d3d3d3]">
                Nội dung
              </div>
              <div className="w-[35%]">
                <span className="max-w-[150px] mx-auto">
                  Thành phần Thường trực Tỉnh ủy tham dự
                </span>
              </div>
            </div>
          </div>
          <div className="">
            {dataScheduleCurrentWeek?.dates &&
              dataScheduleCurrentWeek?.dates?.map(
                (item: any, index: number) => {
                  const date = listDayOfWeek[index]?.dateToMap;
                  const dateRender = listDayOfWeek[index];
                  const dataDetail = item?.[date];
                  return (
                    <div
                      key={index}
                      className="flex border border-collapse border-[#d3d3d3]"
                    >
                      <div className="w-[20%] p-4 border-r flex border-[#d3d3d3] flex-col items-center justify-center">
                        <div className="font-bold">{dateRender?.day}</div>
                        <div className="font-normal">{dateRender?.date}</div>
                      </div>
                      <div className="flex flex-col w-[80%]">
                        {dataDetail && dataDetail?.length > 0 ? (
                          dataDetail?.map((item: any, index: number) => {
                            return (
                              <div
                                key={item?.id || index}
                                className={`flex h-full ${
                                  index !== dataDetail?.length - 1 &&
                                  index + 1 !== dataDetail?.length &&
                                  'border-b border-[#d3d3d3]'
                                }`}
                              >
                                <div className="flex-1 flex items-center border-r p-4 border-[#d3d3d3]">
                                  {item?.allDay === false ? (
                                    <p>
                                      {item?.start && (
                                        <span className="font-bold">
                                          * {getTimePeriod(item?.start)}:{' '}
                                        </span>
                                      )}
                                      <i>
                                        {item?.start
                                          ?.slice(0, 5)
                                          ?.replace(':', ' giờ ')
                                          ?.replace(' 00', '')}{' '}
                                        {item?.end &&
                                          '- đến ' +
                                            item?.end
                                              ?.slice(0, 5)
                                              ?.replace(':', ' giờ ')
                                              ?.replace(' 00', '')}
                                      </i>{' '}
                                      <span className="block py-[2px]">
                                        {item?.content}
                                      </span>
                                    </p>
                                  ) : (
                                    <p>
                                      <span className="font-bold mb-[3px]">
                                        * Cả ngày{' '}
                                      </span>
                                      <span className="block">
                                        {' '}
                                        {item?.content}
                                      </span>
                                    </p>
                                  )}
                                </div>
                                <div
                                  className="w-[35%] p-2 h-full flex items-center flex-col justify-center"
                                  dangerouslySetInnerHTML={{
                                    __html: item?.attendees,
                                  }}
                                ></div>
                              </div>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TableSchedule;
