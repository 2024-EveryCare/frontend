import axios from 'axios';
import { baseInstance } from './config';

export const pillSearch = async (searchData: string) => {
  try {
    const response = await baseInstance.get(
      `https://everycare.site/api/v1/medicines/findName`,
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
