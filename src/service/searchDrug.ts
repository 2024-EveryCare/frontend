import axios from 'axios';
import { baseInstance } from './config';

export const autoData = async (searchData: string) => {
  try {
    const response = await baseInstance.get(
      `http://localhost:8080/api/v1/medicines/findName`,
      {
        params: { drugName: searchData },
      },
    );

    if (response.status === 200) {
      return response.data.data || [];
    } else {
      return [];
    }
  } catch (error) {
    console.log('자동 완성 데이터 호출 실패:', error);
    return [];
  }
};

export const drugSearch = async (searchInputValue: string) => {
  try {
    const response = await baseInstance.get(
      `http://localhost:8080/api/v1/medicines/find-drug-info`,
      {
        params: { drugName: searchInputValue },
      },
    );
    return response.data.data.map((drug: any) => ({
      drugName: drug.name,
      imageUrl: drug.imageUrl,
      name: drug.name,
    }));
  } catch (error) {
    console.log('약물 검색 중 오류 발생', error);
    return [];
  }
};
