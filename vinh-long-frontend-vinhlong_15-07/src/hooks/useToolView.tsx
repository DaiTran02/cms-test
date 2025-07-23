// fetchWidget

import { fetchToolView } from '@/Services/ClientServices/tool-view';
import { useQuery } from '@tanstack/react-query';

export const useFetchToolView = () => {
  return useQuery({
    queryKey: ['tracking-visitor'],
    queryFn: ({ signal }) => fetchToolView({ signal }),
  });
};
