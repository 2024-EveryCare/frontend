import { baseInstance } from './config';

export interface SignupData {
  email: string;
  password: string;
  name: string;
  birthdate: string;
}

export async function signupUser(data: SignupData) {
  try {
    const response = await baseInstance.post(
      'http://www.everycare.site/api/v1/members/signup',
      data,
      {
        withCredentials: true, // credentials: 'include'와 동일
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('회원가입 응답:', response.data);

    return response.data;
  } catch (error) {
    console.error('회원가입 에러:', error);
    throw error; // 에러를 throw하여 상위 호출자가 처리할 수 있게 함
  }
}
