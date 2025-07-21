import type { QueryType } from '@/interface/queryType';
import axios from 'axios';

const fetchOptions = {
  next: { revalidate: 300 },
  headers: {
    'X-Website-Id': `${process?.env.NEXT_PUBLIC_WEBSITE_ID}`,
  },
};

export async function fetchDocxList(params: QueryType) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/modules/docs/get-list-docs`,
      { ...fetchOptions, params }
    );
    if (response) {
      const { result } = response.data;
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}
