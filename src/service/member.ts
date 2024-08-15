import axios from 'axios';

export const memberInfo = async () => {
  const response = await axios.get(
    `http://localhost:8080/api/v1/members/mypage`,
    {
      withCredentials: true,
    },
  );
  console.log(response.data.data);

  return response;
};

// export const memberLogout = async () => {
//   const response = await axios.post(
//     `http://localhost:8080/api/v1/members/logout`,
//   );
// };
