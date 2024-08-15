import { toInteger } from 'lodash';

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
};

export const formatDateObject = (dateOb: data) => {
  //date객체를 문자열로 바꿔주는 함수.
  const dateStr = String(dateOb).split(' '); // date가 datepicker 의 객체로 전달되어서 형변환 필요.
  //date객체를 문자열로 쪼개면
  //['Thu', 'Jan', '01', '1970', '09:00:00', 'GMT+0900', '(한국', '표준시)'] 이러한 출력이 나옴.
  // 이 부분을 "1970-01-01" 이라는 출력값으로 리턴해주는 역할
  switch (dateStr[1]) {
    case 'Jan':
      dateStr[1] = '01';
      break;
    case 'Feb':
      dateStr[1] = '02';
      break;
    case 'Mar':
      dateStr[1] = '03';
      break;
    case 'Apr':
      dateStr[1] = '04';
      break;
    case 'May':
      dateStr[1] = '05';
      break;
    case 'Jun':
      dateStr[1] = '06';
      break;
    case 'Jul':
      dateStr[1] = '07';
      break;
    case 'Aug':
      dateStr[1] = '08';
      break;
    case 'Sep':
      dateStr[1] = '09';
      break;
    case 'Oct':
      dateStr[1] = '10';
      break;
    case 'Nov':
      dateStr[1] = '11';
      break;
    case 'Dec':
      dateStr[1] = '12';
      break;
  }
  const formatedDate = dateStr[3] + '-' + dateStr[1] + '-' + dateStr[2];
  return formatedDate;
};

export const intakeDailyCalculator = (
  morning: boolean,
  lunch: boolean,
  night: boolean,
): string => {
  const binaryCycle = [morning ? 1 : 0, lunch ? 1 : 0, night ? 1 : 0];
  const response = binaryCycle.join('');
  console.log('intakeDaily:', response);
  return response;
};
