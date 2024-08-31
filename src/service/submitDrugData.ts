import axios from 'axios';
import { baseInstance } from './config';

export const submitDrugData = async (
  drugNames: string[],
  intakeStart: string,
  intakeEnd: string,
  intakeCycle: number,
  intakeDaily: string,
  hospital: string,
  disease: string,
) => {
  const requestData = {
    drugNames,
    intakeStart,
    intakeEnd,
    intakeCycle: 0,
    intakeDaily,
    hospital,
    disease,
  };

  try {
    const response = await baseInstance.post(
      'http://localhost:8080/api/v1/medicines/direct-records',
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        withCredentials: true,
      },
    );
    console.log('서버 응답:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('서버 응답 오류 데이터:', error.response.data);
      console.error('서버 응답 상태:', error.response.status);
      console.error('서버 응답 헤더:', error.response.headers);
    } else {
      console.error('요청 실패:', error);
    }
  }
};
