import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatYYMMDD } from '@/utils/utilitiesHandling';
import { format, parse } from 'date-fns';
import React from 'react';
const BlockHeadSchedule = ({
  currentYear,
  className,
  listDayOfWeek,
  currentWeek,
  handleGetYear,
  handleGetWeek,
  yearsSelected,
  years,
  weekSelected,
  listWeek,
  handleChangeSchedule,
  isScheduleDay,
  dateCurrent,
  startDay,
  endDay,
}: {
  currentYear: number;
  className?: string;
  listDayOfWeek?: any;
  currentWeek: number;
  yearsSelected?: number;
  handleGetWeek: (value: string) => void;
  handleGetYear: (value: string) => void;
  handleChangeSchedule: () => void;
  listWeek?: number[];
  years?: number[];
  weekSelected?: number;
  isScheduleDay?: boolean;
  dateCurrent?: Date;
  startDay?: string;
  endDay?: string;
}) => {
  if (!listDayOfWeek) {
    return <>Loading...</>;
  }
  const startDate = listDayOfWeek?.[0]?.date
    ? format(parse(listDayOfWeek[0].date, 'd/M/yyyy', new Date()), 'dd/MM')
    : '';

  const endDate = listDayOfWeek?.[listDayOfWeek.length - 1]?.date
    ? format(
        parse(
          listDayOfWeek[listDayOfWeek.length - 1].date,
          'd/M/yyyy',
          new Date()
        ),
        'dd/MM/yyyy'
      )
    : '';
  return (
    <div className={`${className}`}>
      <div
        className={`flex items-center gap-3 max-md:flex-col max-md:items-stretch ${
          !isScheduleDay ? 'justify-between' : 'justify-end'
        }`}
      >
        {!isScheduleDay && (
          <>
            <div className="flex justify-between items-center gap-5 ">
              <span className="heading-3">Năm:</span>
              <div className="">
                <Select onValueChange={(value) => handleGetYear(value)}>
                  <SelectTrigger className="w-[190px] cursor-pointer border-grey-line">
                    <SelectValue
                      placeholder={yearsSelected}
                      className="py-2 px-4 cursor-pointer"
                    />
                  </SelectTrigger>
                  <SelectContent className="w-full border-none text-black bg-white">
                    {years &&
                      years?.map((year) => (
                        <SelectItem
                          className="cursor-pointer"
                          key={year}
                          value={`${year}`}
                        >
                          {year}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-between items-center gap-5">
              <span className="heading-3">Tuần:</span>
              <div className="">
                <Select onValueChange={(value) => handleGetWeek(value)}>
                  <SelectTrigger className="w-[190px] border-grey-line cursor-pointer">
                    <SelectValue
                      placeholder={weekSelected}
                      className="py-2 px-4"
                    />
                  </SelectTrigger>
                  <SelectContent className="border-none text-black bg-white">
                    {listWeek &&
                      listWeek?.length >= 1 &&
                      listWeek?.map((week: number) => (
                        <SelectItem
                          key={week}
                          value={`${week}`}
                          className="cursor-pointer"
                        >
                          {week}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}
        <div
          onClick={handleChangeSchedule}
          className="bg-red-hover max-w-[190px] flex justify-between
       items-center w-full body-2 text-black py-2 px-4 mb-3 cursor-pointer"
        >
          Xem lịch {!isScheduleDay ? 'ngày' : 'tuần'}
          <span className="block text-[#666] text-end">&#8250;</span>
        </div>
      </div>
      {!isScheduleDay && (
        <div className="w-full cursor-pointer flex gap-3 items-center justify-end mt-5">
          <img
            className="max-w-[40px]"
            srcSet="/images/icons/printer.png 2x"
            alt="icon printer"
          />
          <span>In lịch tuần</span>
        </div>
      )}

      <div className="text-center body-2 text-[#000]">
        <h1 className="heading-2">THÔNG BÁO</h1>
        <h2>
          Lịch làm việc{' '}
          {!isScheduleDay
            ? 'tuần'
            : `ngày ${dateCurrent && formatYYMMDD(dateCurrent, 'dmYY')}`}
        </h2>
        {!isScheduleDay && (
          <p>
            từ ngày {startDate} đến ngày {endDate}
          </p>
        )}
      </div>
    </div>
  );
};

export default React.memo(BlockHeadSchedule);
