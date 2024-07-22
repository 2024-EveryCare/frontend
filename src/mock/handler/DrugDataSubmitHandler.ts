import { http, HttpResponse } from 'msw';

export const drugDataSubmitHandler = [
  http.post('api/v1/medicines/photo/memberid', async ({ request }) => {
    const user = await request.json();
    const { intakeStart } = user;
    const { intakeEnd } = user;
    const { intakeCycle } = user;
    const { intakeDaily } = user;
    const { drugName } = user;
    console.log('섭취 시작일(msw) :', intakeStart);
    console.log('섭취 종료일(msw) :', intakeEnd);
    console.log('섭취 주기(msw) :', intakeCycle);
    console.log('섭취 횟수(msw) :', intakeDaily);
    console.log('약 이름(msw): ', drugName);

    const response = {
      code: 'R002',
      status: 'CREATED',
      message: 'OCR 결과 등록 성공',
    };
    return HttpResponse.json(response, { status: 201 });
  }),
];
