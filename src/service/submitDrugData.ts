import axios from 'axios';

export const submitDrugData = (
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
    .post(`http://localhost:8080/api/v1/medicines/photo/${memberId}`, {
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
};
