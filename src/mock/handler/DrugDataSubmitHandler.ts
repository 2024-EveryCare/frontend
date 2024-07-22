import { http, HttpResponse } from 'msw';


export const DrugDataSubmitHandler = (
  intakeStart,
  intakeEnd,
  intakeCycle,
  intakeDaily,
  hospital,
  disease,
) => [
  http.post('api/v1/medicines/photo/{memberId}', async () => {
    const data = {
      intakeStart,
      intakeEnd,
      intakeCycle,
      intakeDaily,
      hospital,
      disease,
    };
    console.log('data 전송 완료(msw)', data);

    const response = {
      code: 'R002',
      status: 'CREATED',
      message: 'OCR 결과 등록 성공',
      data: data,
    };
    return HttpResponse.json(response, { status: 201 });
  }),
];
