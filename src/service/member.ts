import axios from 'axios';

export const memberInfo = async () => {
  const response = await axios.get(
    `http://localhost:8080/api/v1/members/mypage`,
    {
      withCredentials: true,
    },
  );
  console.log(response.data.data);

  return response.data.data;
};

export const memberLogout = async () => {
  const response = await axios.post(
    'http://localhost:8080/api/v1/members/logout',
    {}, // 요청 본문이 필요 없는 경우 빈 객체로 전달
    {
      withCredentials: true, // 이 위치에 설정해야 합니다.
    },
  );
  return response;
};
