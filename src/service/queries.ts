import { useQuery, useQueryClient } from 'react-query';
import { searchDrug } from './searchDrug';

export const useSearchDrug = (drugName: string) => {
  const queryClient = useQueryClient(); // 캐시에 저장되어있는 데이터를 다른곳에서 사용하기 위해
  const { data, isLoading, error } = useQuery(
    [drugName],
    () => searchDrug(drugName),
    // {
    //   enabled, // 버튼 클릭으로 설정된 enabled 값을 사용
    // },
  );
  const getDrugData = (drugName: string) => {
    return queryClient.getQueryData([drugName]);
  };
  return {
    drugName: data,
    isLoading,
    error,
    getDrugData,
  };
};
