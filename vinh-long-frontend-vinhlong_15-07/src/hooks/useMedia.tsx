import { fetchMediaList } from '@/Services/ClientServices/media';
import { useQuery } from '@tanstack/react-query';

export const useFetchMediaList = (path: string) => {
  return useQuery({
    queryKey: ['list-media'],
    queryFn: ({ signal }) => fetchMediaList({ signal }),
    enabled: !!path,
  });
};
