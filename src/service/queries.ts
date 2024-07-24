import { useQuery } from 'react-query';
import { searchDrug } from './searchDrug';

export const useSearchDrug = (drugName: string) => {
  const { data, isLoading, error } = useQuery(
    [drugName],
    () => searchDrug(drugName),
    // {
    //   enabled, // 버튼 클릭으로 설정된 enabled 값을 사용
    // },
  );
  return {
    drugName: data,
    isLoading,
    error,
  };
};
