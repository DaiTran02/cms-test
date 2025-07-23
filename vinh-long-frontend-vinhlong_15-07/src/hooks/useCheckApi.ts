import { fetchCheckApi } from '@/Services/ClientServices/checkApi';
import { useQuery } from '@tanstack/react-query';

export const useFetchCheckApi = () => {
  return useQuery({
    queryKey: ['check-api'],
    queryFn: ({ signal }) => fetchCheckApi({ signal }),
  });
};
