import type { QueryType } from '@/interface/queryType';
import {
  fetchArticleList,
  fetchDetailArticle,
} from '@/Services/ClientServices/article';
import { parseParams } from '@/utils/utilitiesHandling';
import { useQuery } from '@tanstack/react-query';

export const useFetchArticleList = (queryList: QueryType, limit: number) => {
  const params = parseParams(queryList, limit);
  const qrKey = queryList?.cateId ?? queryList?.cateAlias;
  return useQuery({
    queryKey: [qrKey, params, limit],
    queryFn: ({ signal }) => fetchArticleList({ signal }, params),
    enabled: !!queryList && !!limit !== null,
  });
};
export const useReFetchArticleList = (
  queryList: QueryType,
  limit: number,
  layout = true
) => {
  const params = parseParams(queryList, limit);
  const qrKey = queryList?.cateId ?? queryList?.cateAlias;

  return useQuery({
    queryKey: [qrKey, { ...params }],
    queryFn: ({ signal }) => fetchArticleList({ signal }, params),
    enabled: !!layout,
  });
};
export const useFetchRelatedArticleList = (
  queryList: QueryType,
  limit: number
) => {
  return useQuery({
    queryKey: [{ ...queryList }, limit],
    queryFn: ({ signal }) => fetchArticleList({ signal }, queryList),
    enabled: !!queryList,
  });
};

export const useFetchDetailArticle = (
  paramsAlias: { detailAlias: string; preview?: boolean } | null,
  preview?: boolean
) => {
  const detailAlias = paramsAlias?.detailAlias?.replace('.ngn', '');
  const arrAlias: any = detailAlias?.split('-');
  const id = arrAlias?.length && arrAlias[arrAlias?.length - 1];
  const params: QueryType = {};
  const regexId = /^[a-zA-Z0-9]{24}$/;
  const regexShortId = /^[1-9][0-9]{6,}$/;
  let articleId = '';
  if (preview) {
    params.preview = true;
  }
  if (regexShortId.test(id)) {
    articleId = id;
  } else if (regexId.test(id)) {
    articleId = id;
  } else if (detailAlias) {
    articleId = detailAlias;
  }
  return useQuery({
    queryKey: ['detailArticle', articleId],
    queryFn: ({ signal }) =>
      fetchDetailArticle({
        signal,
        articleId: `${articleId}${
          paramsAlias?.preview == true ? `?preview=${paramsAlias?.preview}` : ''
        }`,
      }),
    enabled: !!paramsAlias && preview && paramsAlias !== null,
  });
};
