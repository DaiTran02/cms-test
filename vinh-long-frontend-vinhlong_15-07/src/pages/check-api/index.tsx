import MainLayout from '@/components/MainLayout';
import { useFetchCheckApi } from '@/hooks/useCheckApi';

const CheckApi = () => {
  const { data, isLoading } = useFetchCheckApi();
  return <MainLayout>{`${data}`}</MainLayout>;
};

export default CheckApi;
