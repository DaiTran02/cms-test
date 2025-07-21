// fetchWidget

import { fetchAds, fetchAdsSlot } from '@/Services/ClientServices/bannerAds';
import { useQuery } from '@tanstack/react-query';

export const useFetchAds = (adsId: string) => {
  return useQuery({
    queryKey: ['adsId', adsId],
    queryFn: ({ signal }) => fetchAds({ signal, adsId }),
    enabled: adsId != '' && !!adsId,
  });
};

export const useFetchAdsSlot = (adsSlot: string) => {
  return useQuery({
    queryKey: ['adsSlot', adsSlot],
    queryFn: ({ signal }) => fetchAdsSlot({ signal, adsSlot }),
    enabled: adsSlot != '' && !!adsSlot,
  });
};
