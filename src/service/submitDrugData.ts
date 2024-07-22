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
  axios
    .post('api/v1/medicines/photo/memberid', {
      drugName: drugName,
      intakeStart: intakeStart,
      intakeEnd: intakeEnd,
      intakeCycle: null,
      intakeDaily: intakeDaily,
      hospital: hospital,
      disease: disease,
    })
    .then((response) => {
      console.log('데이터 전송 완료', response);
      console.log('intakeStart', intakeStart);
      console.log('intakeEnd', intakeEnd);
      console.log('intakeCycle', null);
      console.log('intakeDaily', intakeDaily);
      console.log('hospital', hospital);
      console.log('disease', disease);
    });
};
