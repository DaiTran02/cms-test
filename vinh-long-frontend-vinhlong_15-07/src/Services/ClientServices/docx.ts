import type { QueryType } from '@/interface/queryType';
import { parseParams } from '@/utils/utilitiesHandling';
import axios from 'axios';

export async function fetchDocxList({
  params,
  signal,
}: {
  params: QueryType;
  signal: AbortSignal;
}) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/modules/docs/get-list-docs`,
      {
        signal,
        params,
        headers: {
          'X-Website-Id': `${process?.env.NEXT_PUBLIC_WEBSITE_ID}`,
        },
      }
    );
    if (response) {
      const { result } = response.data;
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCateDocxList({
  signal,
  params,
}: {
  signal: AbortSignal;
  params: QueryType;
}) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/modules/docs/get-list-categories`,
      {
        signal,
        params,
        headers: {
          'X-Website-Id': `${process?.env.NEXT_PUBLIC_WEBSITE_ID}`,
        },
      }
    );
    if (response) {
      const { result } = response.data;
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function fetchAttachmentsDocx({
  signal,
  docId,
}: {
  signal: AbortSignal;
  docId: string;
}) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/modules/docs/get-attachments/${docId}`,
      {
        signal,
        headers: {
          'X-Website-Id': `${process?.env.NEXT_PUBLIC_WEBSITE_ID}`,
        },
      }
    );
    if (response) {
      const { result } = response.data;
      return result;
    }
  } catch (error) {
    console.log('Lỗi tệp đính kèm', error);
  }
}
export async function fetchDocxWithTabs({
  dataTabs,
  signal,
  params,
}: {
  dataTabs: QueryType[];
  signal: AbortSignal;
  params?: QueryType;
}) {
  try {
    const data = await Promise.all(
      dataTabs?.map(async (item: any) => {
        const listQuery = { ...params, categoryId: item?.id };
        const queryString = new URLSearchParams(listQuery as any).toString();
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/modules/docs/get-list-docs?${queryString}`,
          {
            signal,
            headers: {
              'X-Website-Id': `${process?.env.NEXT_PUBLIC_WEBSITE_ID}`,
            },
          }
        );
        return { dataTabs: response?.data?.result, name: item?.name };
      })
    );

    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchFilterDocxType({ signal }: { signal: AbortSignal }) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/modules/docs/get-document-types-filter`,
      {
        signal,
        headers: {
          'X-Website-Id': `${process?.env.NEXT_PUBLIC_WEBSITE_ID}`,
        },
      }
    );
    if (response) {
      const { result } = response.data;
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function fetchFilterFieldTypes({
  signal,
}: {
  signal: AbortSignal;
}) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/modules/docs/get-field-types-filter`,
      {
        signal,
        headers: {
          'X-Website-Id': `${process?.env.NEXT_PUBLIC_WEBSITE_ID}`,
        },
      }
    );
    if (response) {
      const { result } = response.data;
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function fetchFilteIssuedAgency({
  signal,
}: {
  signal: AbortSignal;
}) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/modules/docs/get-issued-agency-names-filter`,
      {
        signal,
        headers: {
          'X-Website-Id': `${process?.env.NEXT_PUBLIC_WEBSITE_ID}`,
        },
      }
    );
    if (response) {
      const { result } = response.data;
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}
