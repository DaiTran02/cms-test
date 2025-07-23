import type { QueryType } from '@/interface/queryType';
import { parseParams } from '@/utils/utilitiesHandling';

const fetchOptions = {
  next: { revalidate: 300 },
  headers: {
    'X-Website-Id': `${process?.env.NEXT_PUBLIC_WEBSITE_ID}`,
  },
};

export async function fetchServerArticleList(
  listQuery: QueryType,
  limit: number
) {
  try {
    const params = await parseParams(listQuery, limit);
    const queryString = new URLSearchParams(params as any).toString();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/article/listing?${queryString}`,
      fetchOptions
    );
    const data = await response.json();
    const { result } = data;
    if (result) {
      return result;
    }
    if (!response.ok) {
      throw new Error('Lỗi get category list');
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchServerArticleDetail(
  alias: string,
  preview?: boolean
) {
  try {
    const detailAlias = alias?.replace('.ngn', '');
    const arrAlias = detailAlias?.split('-');
    const id = arrAlias[arrAlias?.length - 1];
    const regexId = /^[a-zA-Z0-9]{24}$/;
    const regexShortId = /^[1-9][0-9]{6,}$/;
    let articleId = '';
    const params: QueryType = {};
    if (preview) {
      params.preview = true;
    }
    if (regexShortId.test(id)) {
      articleId = id;
    } else if (regexId.test(id)) {
      articleId = id;
    } else {
      articleId = detailAlias;
    }
    // console.log('articleId :>> ', articleId);
    console.log(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/article/${articleId}`
    );
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/article/${articleId}`,
      fetchOptions
    );
    if (!response.ok) {
      console.log('response :>> ', response);
      throw new Error('Lỗi gì đây get article detail');
    }
    const data = await response.json();
    const { result } = data;
    if (result) {
      return result;
    }
    if (!response.ok) {
      throw new Error('Lỗi get category id');
    }
  } catch (error) {
    console.log(error);
  }
}
