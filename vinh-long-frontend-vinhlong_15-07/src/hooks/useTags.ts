import type { QueryType } from '@/interface/queryType';
import { fetchTagsList } from '@/Services/ClientServices/Tag';
import { useQuery } from '@tanstack/react-query';

export const useFetchTagsList = (params: QueryType) => {
  return useQuery({
    queryKey: ['tags', params],
    queryFn: ({ signal }) => fetchTagsList({ signal }, params),
    enabled: !!params?.tagIds,
  });
};
