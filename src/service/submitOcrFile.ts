import axios from 'axios';
import { baseInstance } from './config';

export const submitOcrFile = async (formData: FormData) => {
  try {
    // console.log(file);
    // Axios 요청
    const file = formData.get('file');
    console.log(file);
    const response = await baseInstance.post(
      'http://localhost:8080/api/v1/medicines/photo',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      },
    );

    // 콘솔에 응답 데이터 확인
    console.log('콘솔에 응답 데이터 확인');
    console.log(response);
    console.log(response.data.drugName);

    // console.log(response.data.data[0].drugName);

    // 필요한 데이터 추출 및 반환
    return {
      drugName: response.data.drugName,
      intakeStart: response.data.intakeStart,
      intakeEnd: response.data.intakeEnd,
      intakeCycle: response.data.intakeCycle,
      hospital: response.data.hospital,
      disease: response.data.disease,
    };
  } catch (error) {
    // 오류 처리
    console.error('submitOcrFile에서 오류 발생 :', error);
    // 필요에 따라 오류를 반환하거나 다른 처리를 할 수 있음
    throw error; // 또는 return undefined; 등
  }
};
