import axios from 'axios';

/* export const submitDrugData = (
  drugName,
  intakeStart,
  intakeEnd,
  intakeCycle,
  intakeDaily,
  hospital,
  disease,
) => {
  const memberId = 1;
  axios
    .post(`http://localhost:8080/api/v1/medicines/direct-records/${memberId}`, {
      // memberID 세션 구현전에 1 넣겠음.
      drugName: drugName,
      intakeStart: intakeStart,
      intakeEnd: intakeEnd,
      intakeCycle: 0, // 미구현 이므로 고정값
      intakeDaily: intakeDaily,
      hospital: hospital,
      disease: disease,
    })
    .then((response) => {
      console.log('해치웠나?', response);
    });
}; */

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
    const response = await axios.post(
      'http://localhost:8080/api/v1/medicines/direct-records',
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
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
