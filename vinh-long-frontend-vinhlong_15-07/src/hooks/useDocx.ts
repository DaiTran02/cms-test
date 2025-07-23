import type { QueryType } from '@/interface/queryType';
import {
  fetchAttachmentsDocx,
  fetchCateDocxList,
  fetchDocxList,
  fetchDocxWithTabs,
  fetchFilteIssuedAgency,
  fetchFilterDocxType,
  fetchFilterFieldTypes,
} from '@/Services/ClientServices/docx';
import { useQuery } from '@tanstack/react-query';

export const useFetchDocxList = (listParams: any, queryFilter?: any) => {
  let params = { ...queryFilter };
  if (!!queryFilter && Object.keys(queryFilter).length > 0) {
    params = { ...queryFilter, ...listParams };
  } else {
    params = { ...listParams };
  }
  return useQuery({
    queryKey: ['docxList', params],
    queryFn: ({ signal }) => fetchDocxList({ signal, params }),
    enabled: !!params && queryFilter !== null,
  });
};
// export const useFetchDocxListWithFilter = (
//   listParams: QueryType,
//   queryFilter: any
// ) => {
//   const params = { ...listParams, ...queryFilter };
//   return useQuery({
//     queryKey: ['docxListFilter'],
//     queryFn: ({ signal }) => fetchDocxList({ signal, params }),
//     enabled: !!queryFilter && queryFilter,
//   });
// };
let initParams = { limit: -1, keyword: null, skip: 0 };
export const useFetchCateDocxList = (params = initParams) => {
  return useQuery({
    queryKey: ['cateDocx'],
    queryFn: ({ signal }) => fetchCateDocxList({ signal, params }),
    enabled: !!params,
  });
};

export const useFetchAttachmentsDocx = (docId: string, isEnable: boolean) => {
  return useQuery({
    queryKey: ['attachmentsDocx', docId],
    queryFn: ({ signal }) => fetchAttachmentsDocx({ signal, docId }),
    enabled: !!isEnable,
  });
};

export const useFetchDocxWithTabs = (
  dataTabs: QueryType[],
  params: QueryType
) => {
  return useQuery({
    queryKey: ['docxListwithTabs'],
    queryFn: ({ signal }) => fetchDocxWithTabs({ signal, dataTabs, params }),
    enabled: !!dataTabs,
  });
};

export const useFetchFilterDocxType = () => {
  return useQuery({
    queryKey: ['docxTypeFilter'],
    queryFn: ({ signal }) => fetchFilterDocxType({ signal }),
  });
};
export const useFetchFilterFieldTypes = () => {
  return useQuery({
    queryKey: ['fieldTypes'],
    queryFn: ({ signal }) => fetchFilterFieldTypes({ signal }),
  });
};
export const useFetchFilteIssuedAgency = () => {
  return useQuery({
    queryKey: ['issuedAgency'],
    queryFn: ({ signal }) => fetchFilteIssuedAgency({ signal }),
  });
};
