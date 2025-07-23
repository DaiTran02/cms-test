import type { QueryType } from '@/interface/queryType';
import { parseParams } from '@/utils/utilitiesHandling';

const fetchOptions = {
  next: { revalidate: 300 },
  headers: {
    'X-Website-Id': `${process?.env.NEXT_PUBLIC_WEBSITE_ID}`,
  },
};

export async function fetchServerCategoryList() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/category/list`,
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
    return [];
  }
}

export async function fetchServerCategoryId(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/category/${id}`,
      fetchOptions
    );
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
    return [];
  }
}
let initParams = { limit: -1, keyword: null, skip: 0 };

export async function fetchServerCateDocxList(
  listQuery: QueryType,
  limit = -1
) {
  try {
    if (!listQuery) {
      listQuery = initParams;
    }
    const params = await parseParams(listQuery, limit);
    const queryString = new URLSearchParams(params as any).toString();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/modules/docs/get-list-categories?${queryString}`,
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
    return [];
  }
}
export async function fetchServerDisplayType() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/category/get-display-types`,
      fetchOptions
    );
    const data = await response.json();
    const { result } = data;
    if (result) {
      return result;
    }
    if (!response.ok) {
      throw new Error('Lỗi get display types');
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}
