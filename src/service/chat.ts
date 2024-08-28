import axios from 'axios';

export const chatService = async (text: string) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/v1/chatbot/ask',
      { prompt: text }, // 요청 본문
      { withCredentials: true }, // 추가 옵션
    );

    return response.data; // 응답 데이터를 반환하거나 필요한 작업 수행
  } catch (error) {
    console.error('Error occurred while sending the request:', error);
    throw error; // 필요에 따라 에러를 던지거나 에러 처리
  }
};
