import axios from 'axios';
import { baseInstance } from './config';

export const chatService = async (text: string) => {
  try {
    const response = await baseInstance.post(
      'https://www.everycare.site/api/v1/chatbot/ask',
      { prompt: text }, // 요청 본문
      { withCredentials: true }, // 추가 옵션
    );

    return response.data; // 응답 데이터를 반환하거나 필요한 작업 수행
  } catch (error) {
    console.error('채팅을 요청하는 도중 오류 발생 :', error);
    throw error; // 필요에 따라 에러를 던지거나 에러 처리
  }
};

/* export const newChatService = async () => {
  try {
    const response = await axios.get(
      'https://www.everycare.site/api/v1/chatbot/newchat',
      { withCredentials: true },
    );
    return response; // 응답 데이터를 반환하거나 필요한 작업 수행
  } catch (error) {
    console.error('새로운 채팅 생성 중 오류 발생 :', error);
    throw error; // 필요에 따라 에러를 던지거나 에러 처리
  }
}; */

export const monitoringService = async () => {
  const response = await baseInstance.get('/chatbot/monitoring', {
    withCredentials: true,
  });
  return response.data.data.statistics;
};
