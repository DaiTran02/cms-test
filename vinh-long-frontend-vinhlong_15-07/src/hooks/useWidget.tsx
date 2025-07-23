// fetchWidget

import { fetchWidget, fetchWidgetSlot } from '@/Services/ClientServices/widget';
import { useQuery } from '@tanstack/react-query';

export const useFetchWidget = (widgetId: string) => {
  return useQuery({
    queryKey: ['widgetId', widgetId],
    queryFn: ({ signal }) => fetchWidget({ signal, widgetId }),
    enabled: widgetId != '' && !!widgetId,
  });
};

export const useFetchWidgetSlot = (widgetSlot: string) => {
  return useQuery({
    queryKey: ['widgetSlot', widgetSlot],
    queryFn: ({ signal }) => fetchWidgetSlot({ signal, widgetSlot }),
    enabled: widgetSlot != '' && !!widgetSlot,
  });
};
