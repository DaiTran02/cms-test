import axios from 'axios';

export async function fetchAds({
  signal,
  adsId,
}: {
  signal: AbortSignal;
  adsId: string;
}) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/ads/${adsId}`,
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

export async function fetchAdsSlot({
  signal,
  adsSlot,
}: {
  signal: AbortSignal;
  adsSlot: string;
}) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/ads/${adsSlot}`,
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
