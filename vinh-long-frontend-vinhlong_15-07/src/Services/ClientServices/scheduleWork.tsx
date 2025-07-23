import type { QueryType } from '@/interface/queryType';
import { formatYYMMDD } from '@/utils/utilitiesHandling';
import axios from 'axios';
import { format, startOfWeek } from 'date-fns';

export async function fetchScheduleCurrentWeek({
  signal,
  params,
}: {
  signal: AbortSignal;
  params?: QueryType;
}) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/modules/work-schedules/get-list-current-dates-of-week`,
      {
        signal,
        params,
        headers: {
          'X-Website-Id': `${process?.env.NEXT_PUBLIC_WEBSITE_ID}`,
        },
      }
    );

    const { result } = response.data;

    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchDatesOfWeekSchedule({
  signal,
  listQuery,
}: {
  signal: AbortSignal;
  listQuery: QueryType;
}) {
  try {
    const queryObj: Record<string, string> = {};

    if (listQuery.weekOfYear) queryObj.weekOfYear = listQuery.weekOfYear;
    if (listQuery.year) queryObj.year = listQuery.year;

    const queryString = new URLSearchParams(queryObj).toString();
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/modules/work-schedules/get-list-dates-of-week?${queryString}`,
      {
        signal,

        headers: {
          'X-Website-Id': `${process?.env.NEXT_PUBLIC_WEBSITE_ID}`,
        },
      }
    );

    const { result } = response.data;

    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchDetailOfSchedule({
  signal,
  date,
}: {
  signal: AbortSignal;
  date?: Date;
}) {
  try {
    const dateFt = date && formatYYMMDD(date);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/modules/work-schedules/get-details-of-date?date=${dateFt}`,
      {
        signal,

        headers: {
          'X-Website-Id': `${process?.env.NEXT_PUBLIC_WEBSITE_ID}`,
        },
      }
    );
    const { result } = response.data;
    return result;
  } catch (error) {
    console.log(error);
  }
}
