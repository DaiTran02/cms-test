import Container from '@/components/Container/Container';
import GridWrapper from '@/components/LayoutGrid/GridWrapper';
import MainLayout from '@/components/MainLayout';
import TitleCatePage from '@/components/SectionTitle/TitleCatePage';
import { Calendar } from '@/components/ui/calendar';
import {
  useFetchDatesOfWeekSchedule,
  useFetchDetailOfSchedule,
  useFetchScheduleCurrentWeek,
} from '@/hooks/useScheduleWork';
import { fetchWidgetBanner } from '@/Services/mediaService';
import { getDaysOfWeekVi, getWeekNumber } from '@/utils/utilitiesHandling';
import { format, getISOWeeksInYear, parse } from 'date-fns';
import { vi } from 'date-fns/locale';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import BlockHeadSchedule from './BlockHeadSchedule';
import DetailSchedule from './DetailSchedule';
import TableSchedule from './TableSchedule';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
const weekdayLabels = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const startYear = 2015;
const today = new Date();
const currentYear = today.getFullYear();
const currentWeek = getWeekNumber(today);
const ScheduleWord = ({ dataServer }: { dataServer: any }) => {
  const searchParams = useSearchParams();

  const week = searchParams && searchParams.get('week');
  const year = searchParams && searchParams.get('year');
  const [dataTable, setDataTable] = useState({});
  const [date, setDate] = useState<Date>();
  const [isScheduleDay, setIsScheduleDay] = useState(false);
  const [weeks, setWeeks] = useState<number>(
    getISOWeeksInYear(new Date(currentYear, 0, 1))
  );
  //lịch hiện tại của tuần
  // const { data: dataScheduleCurrentWeek } = useFetchScheduleCurrentWeek();
  const isFirstRender = useRef(true);
  const [weekSelected, setWeekSelected] = useState<number>(Number(week));
  const [listQuery, setListQuery] = useState({
    weekOfYear: weekSelected.toString(),
    year: currentYear.toString(),
  });
  const [listWeek, setListWeek] = useState<number[]>([]);
  const [yearsSelected, setYearsSelected] = useState<number>(currentYear);
  const [years, setYears] = useState<number[]>([]);
  const handleGetYear = (value: string) => {
    const year = Number(value);
    setYearsSelected(year);
    const weekInYear = getISOWeeksInYear(new Date(year, 0, 1));
    setWeeks(weekInYear);
    setListWeek(Array.from({ length: weekInYear }, (_, i) => weekInYear - i));
    setListQuery({ weekOfYear: weekSelected.toString(), year: value });
  };

  const handleGetWeek = (value: string) => {
    setWeekSelected(Number(value));
    setListQuery({
      year: yearsSelected.toString(),
      weekOfYear: value,
    });
  };
  const handleChangeSchedule = () => {
    setIsScheduleDay(!isScheduleDay);
  };
  const listDayOfWeek = useMemo(() => {
    return getDaysOfWeekVi(yearsSelected, weekSelected);
  }, [yearsSelected, weekSelected]);
  const { data: dataScheduleWeek } = useFetchDatesOfWeekSchedule(listQuery);
  //lịch ngày hiện tại
  const { data: detailSchedule } = useFetchDetailOfSchedule(date);

  useEffect(() => {
    if (!week) return undefined;
    setWeekSelected(Number(week));
    setDate(new Date());
    setListQuery({
      year: currentYear.toString(),
      weekOfYear: week?.toString() || '1',
    });
    const weekInYear = getISOWeeksInYear(new Date(currentYear, 0, 1));
    setListWeek(Array.from({ length: weekInYear }, (_, i) => weekInYear - i));
    setYears(
      Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => currentYear - i
      )
    );
  }, [week, currentYear]);
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
    <MainLayout dataHeader={dataServer?.bannerheader}>
      <Container>
        <TitleCatePage title="Lịch làm việc" className="mb-7" />
        <GridWrapper>
          <div className="col-span-9">
            {listDayOfWeek && currentYear && (
              <BlockHeadSchedule
                listDayOfWeek={listDayOfWeek}
                currentYear={currentYear}
                className="mb-7"
                currentWeek={dataScheduleWeek?.numberWeek}
                handleGetYear={handleGetYear}
                handleGetWeek={handleGetWeek}
                yearsSelected={yearsSelected}
                years={years}
                weekSelected={weekSelected}
                listWeek={listWeek}
                handleChangeSchedule={handleChangeSchedule}
                isScheduleDay={isScheduleDay}
                dateCurrent={date}
                startDay={dataScheduleWeek?.fromDate}
                endDay={dataScheduleWeek?.toDate}
              />
            )}
            {isScheduleDay == false ? (
              <TableSchedule
                dataScheduleCurrentWeek={dataScheduleWeek}
                listDayOfWeek={listDayOfWeek}
                className="col-span-9"
              />
            ) : (
              <>
                {date && detailSchedule && (
                  <DetailSchedule
                    dateCurrent={date}
                    dataDetail={detailSchedule}
                  />
                )}
              </>
            )}
          </div>
          <div className="col-span-3">
            <div>
              <Calendar
                onSelect={(selectedDate) => {
                  if (selectedDate) {
                    setIsScheduleDay(true);
                    setDate(selectedDate); // khi người dùng chọn lịch
                  }
                }}
                mode="single"
                selected={date}
                className="rounded-md border w-full p-0 border-grey-line"
                captionLayout="label"
                locale={vi}
                showOutsideDays
                formatters={{
                  formatWeekdayName: (date) => weekdayLabels[date.getDay()],
                }}
              />
            </div>
            <div className="block body-2 bg-red-primary py-4 px-5 text-center text-white mt-4">
              <h4 className="heading-3 text-[#000] mb-1">LỊCH LÀM VIỆC TUẦN</h4>
              <p className="">Lịch làm việc của Tỉnh Ủy</p>
              <p>
                từ ngày {startDate} đến ngày {endDate}
              </p>
            </div>
            <div className="body-2 bg-red-primary mt-4 py-4 px-5 text-center">
              <h4 className="heading-3 text-white">THƯ MỜI HỌP CỦA TỈNH ỦY</h4>
            </div>
          </div>
        </GridWrapper>
      </Container>
    </MainLayout>
  );
};

export default React.memo(ScheduleWord);
export async function getStaticProps() {
  try {
    const bannerheader = (await fetchWidgetBanner('Header_banner')) || {};
    const dataServer = JSON.parse(
      JSON.stringify({
        bannerheader: bannerheader,
      })
    );
    return {
      props: {
        dataServer: dataServer,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        dataServer: {},
      },
      revalidate: 30,
    };
  }
}
