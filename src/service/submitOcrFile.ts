import axios from 'axios';

export const submitOcrFile = async (img: FormData) => {
  try {
    // Axios 요청
    const response = await axios.post(
      'http://localhost:8080/api/v1/medicines/photo',
      img,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    // 콘솔에 응답 데이터 확인
    console.log(response.data.data);
    console.log(response.data.data[0].drugName);

    // 필요한 데이터 추출 및 반환
    return {
      drugName: response.data.data[0].drugName,
      intakeStart: response.data.data[0].intakeStart,
      intakeEnd: response.data.data[0].intakeEnd,
      intakeCycle: response.data.data[0].intakeCycle,
      hospital: response.data.data[0].hospital,
      disease: response.data.data[0].disease,
    };
  } catch (error) {
    // 오류 처리
    console.error('submitOcrFile에서 오류 발생:', error);
    // 필요에 따라 오류를 반환하거나 다른 처리를 할 수 있음
    throw error; // 또는 return undefined; 등
  }
};
