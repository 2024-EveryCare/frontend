export interface SignupData {
  email: string;
  password: string;
  name: string;
  birthdate: string;
}

export async function signupUser(data: SignupData) {
  try {
    const response = await fetch(
      'http://localhost:8080/api/v1/members/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      },
    );

    const responseData = await response.json();
    console.log('로그인 응답:', responseData);

    return responseData;
  } catch (error) {
    console.log('회원가입 에러:', error);
  }
}
