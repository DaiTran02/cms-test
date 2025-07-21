import type { QueryType } from '@/interface/queryType';
import {
  fetchDatesOfWeekSchedule,
  fetchDetailOfSchedule,
  fetchScheduleCurrentWeek,
} from '@/Services/ClientServices/scheduleWork';
import { useQuery } from '@tanstack/react-query';
const queryInit: QueryType = {
  ignoreCurrent: true,
};
export const useFetchScheduleCurrentWeek = (params = queryInit) => {
  return useQuery({
    queryKey: ['workSchedules', params],
    queryFn: ({ signal }) => fetchScheduleCurrentWeek({ signal, params }),
  });
};

export const useFetchDatesOfWeekSchedule = (listQuery: QueryType) => {
  return useQuery({
    queryKey: ['datesOfWeekSchedule', listQuery],
    queryFn: ({ signal }) => fetchDatesOfWeekSchedule({ signal, listQuery }),
    enabled: !!listQuery?.weekOfYear && !!listQuery?.year,
  });
};

export const useFetchDetailOfSchedule = (date?: Date) => {
  return useQuery({
    queryKey: ['detailOfSchedule', date],
    queryFn: ({ signal }) => fetchDetailOfSchedule({ signal, date }),
    enabled: !!date,
  });
};
