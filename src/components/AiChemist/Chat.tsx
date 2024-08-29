import React, { useEffect, useState } from 'react';

import ChemistImg from '../../assets/chatBot/Chatbot.png';
import UserImg from '../../assets/dad.png';
import btn from '../../assets/chatBot/Send.svg';
import ChatBg from '../../assets/chatBot/ChatBg.svg';

import {
  chatService,
  monitoringService,
  newChatService,
} from '../../service/chat';
import { useNavigate } from 'react-router';

const Chat: React.FC = () => {
  const navigator = useNavigate();
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
      console.log(response.data.response);
      handleSendAi(response.data.response);
    }
  };

  const handleSaveUser = (userText: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: 'User', text: userText },
    ]); // 이전 메시지 저장 후, 키:값 형태로 객체 저장
  };

  const handleSendAi = (responseText) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: 'AI', text: responseText },
    ]); // AI 응답 저장
  };

  const handleNewChat = async () => {
    const response = newChatService();
    console.log(response);
    setMessages((preMessages) => [
      ...preMessages,
      { user: 'Ai', text: '채팅봇이 초기화 되었습니다.' },
    ]);
    navigator('/chemist');
  };

  const handleIntakeList = async () => {
    console.log('진행중');
    const response = await monitoringService();
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: 'Ai', text: response },
    ]);
  };

  useEffect(() => {
    console.log('채팅중');
    console.log(messages);
  }, [messages]);

  return (
    <div
      className="h-[95%] w-[100%] p-4 space-y-4 relative"
      style={{
        backgroundImage: `url(${ChatBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex justify-center gap-5">
        <button
          className="w-[100px] h-[30px] p-2 border border-blue-500 rounded-[15px] text-[12px] text-blue-500"
          onClick={handleNewChat}
        >
          새 대화 생성
        </button>
        <button
          className="w-[120px] h-[30px] p-2 border border-blue-500 rounded-[15px] text-[12px] text-blue-500"
          onClick={handleIntakeList}
        >
          복용 내역 모니터링
        </button>
      </div>
      {/* 메시지 표시 영역 */}
      <div className="space-y-4 h-[90%] overflow-y-auto max-h-[98%] text-[16px]">
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
      <div className="bottom-[1%] h-[5vh] w-[100%] absolute items-center left-0">
        <input
          className="border border-gray-300 w-[100%] h-[120%] text-[16px] text-center"
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
        <img
          className="absolute w-[8%] right-3 bottom-[5%]"
          src={btn}
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

export default Chat;
