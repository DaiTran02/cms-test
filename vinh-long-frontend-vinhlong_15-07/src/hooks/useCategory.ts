import { useQuery } from '@tanstack/react-query';
import {
  fetchCategory,
  fetchCategoryList,
} from '../Services/ClientServices/category';

export const useFetchCategory = (cateId: string) => {
  return useQuery({
    queryKey: ['categoryId', cateId],
    queryFn: ({ signal }) => fetchCategory({ signal, cateId }),
    enabled: cateId != '' && !!cateId,
  });
};

export const useFetchCategoryList = (name?: string) => {
  return useQuery({
    queryKey: ['categories-list', name],
    queryFn: ({ signal }) => fetchCategoryList({ signal, name }),
  });
};
