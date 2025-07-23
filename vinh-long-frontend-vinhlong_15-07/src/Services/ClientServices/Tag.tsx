import type { QueryType } from '@/interface/queryType';
import axios from 'axios';

export async function fetchTagsList(
  { signal }: { signal: AbortSignal },
  params: QueryType
) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/tag/list`,
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
