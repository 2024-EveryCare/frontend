import axios from 'axios';
import { baseInstance } from './config';

export interface LoginData {
  email: string;
  password: string;
}

export async function loginUser(data: LoginData) {
  const { email, password } = data;

  try {
    const response = await baseInstance.post(
      'http://www.everycare.site/api/v1/members/login',
      { email, password },
      {
        withCredentials: true, // credentials: 'include'와 동일
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('로그인 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('로그인 에러:', error);
    throw error; // 에러를 throw하여 상위 호출자가 처리할 수 있게 함
  }
}
