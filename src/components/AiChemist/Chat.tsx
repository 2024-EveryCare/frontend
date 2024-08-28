import React, { useEffect, useState } from 'react';

import ChemistImg from '../../assets/Chatbot.png';
import UserImg from '../../assets/dad.png';
import { chatService } from '../../service/chat';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([
    {
      user: 'AI',
      text: '에브리님 안녕하세요! 에브리케어의 AI 약사입니다. 궁금한 점이 있으시면 질문해주세요. 올해의 의약품 복용 내역을 한눈에 보고 싶으시면 [의약품 모니터링]을 눌러주세요.',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() !== '') {
      const userText = input;
      handleSaveUser(userText);
      const response = await chatService(input);
      setInput(''); // 입력창 비우기

      handleSendAi(response.data.response);
    }
  };

  const handleSaveUser = (userText: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: 'User', text: userText },
    ]); // 이전 메시지 저장 후, 키:값 형태로 객체 저장
  };

  const handleSendAi = (responseText: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: 'AI', text: responseText },
    ]); // AI 응답 저장
  };

  useEffect(() => {
    console.log('채팅중');
    console.log(messages);
  }, [messages]);

  return (
    <div className="h-[95%] w-[100%] bg-blue-100 p-4 space-y-4">
      {/* 메시지 표시 영역 */}
      <div className="space-y-4 overflow-y-auto max-h-[98%]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 
                ${
                  message.user === 'User' ? 'justify-end' : '' // 유저 메시지 오른쪽 정렬
                }`}
          >
            {message.user !== 'User' && ( // AI 약사 이미지 표시
              <img
                className="w-[40px] h-[40px]"
                src={ChemistImg}
                alt="Chemist"
              />
            )}
            {/* state에 저장된 메시지 표시 */}
            <div className="min-w-[100px] bg-white p-2 rounded-md shadow">
              {message.text}
            </div>
            {message.user === 'User' && ( // 유저 이미지 표시
              <img className="w-[40px] h-[40px]" src={UserImg} alt="User" />
            )}
          </div>
        ))}
      </div>

      {/* 유저 입력 필드 */}
      <div className="bottom-0 h-[3vh] w-[100%] absolute items-center space-x-2">
        <input
          className="flex-grow p-2 rounded-md shadow border border-gray-300 w-[80%]"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-md shadow"
          onClick={handleSend}
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default Chat;
