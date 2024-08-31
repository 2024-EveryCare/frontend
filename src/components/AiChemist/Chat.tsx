import React, { useEffect, useRef, useState } from 'react';

import ChemistImg from '../../assets/chatBot/Chatbot.png';
import UserImg from '../../assets/dad.png';
import btn from '../../assets/chatBot/Send.svg';
import ChatBg from '../../assets/chatBot/ChatBg.svg';

import { chatService, monitoringService } from '../../service/chat';
import { getCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router';
import { PulseLoader } from 'react-spinners';

const Chat: React.FC = () => {
  const navigator = useNavigate();
  const [messages, setMessages] = useState<{ user: string; text: string }[]>(
    [],
  );
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUserName] = useState<string | null>(null);
  const autoScroll = useRef<HTMLDivElement>(null); // 메세지 컨테이너 참조

  const formatMessage = (text) => {
    return text.split(/([.!])\s*/).map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {['.', '!'].includes(part) ? <br /> : null}
      </React.Fragment>
    ));
  };

  const handleSend = async () => {
    if (input.trim() !== '') {
      const userText = input;
      handleSaveUser(userText);
      setInput(''); // 입력창 비우기
      setLoading(true);

      const response = await chatService(input);
      console.log(response.data.response);
      handleSendAi(response.data.response);
      setLoading(false);
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

  const handleNewChat = async () => {
    if (username) {
      setMessages([
        {
          user: 'AI',
          text: `${username}님 안녕하세요! 에브리케어의 AI 약사입니다. 궁금한 점이 있으시면 질문해주세요. 올해의 의약품 복용 내역을 한눈에 보고 싶으시면 [복용 내역 모니터링]을 눌러주세요.`,
        },
      ]);
    }
    setInput('');
    navigator('/chatBot');
  };

  const handleIntakeList = async () => {
    console.log('진행중');
    setLoading(true);
    const response = await monitoringService();
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: 'Ai', text: response },
    ]);
    setLoading(false);
  };

  useEffect(() => {
    const name = getCookie('name');
    setUserName(name);
    if (name) {
      setMessages([
        {
          user: 'AI',
          text: `${name}님 안녕하세요! 에브리케어의 AI 약사입니다. 궁금한 점이 있으시면 질문해주세요. 올해의 의약품 복용 내역을 한눈에 보고 싶으시면 [복용 내역 모니터링]을 눌러주세요.`,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (autoScroll.current) {
      autoScroll.current.scrollIntoView({ behavior: 'smooth' });
    }
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
      <div className="space-y-4 h-[85%] overflow-y-auto scrollbar-custom max-h-[84%] text-[16px] leading-normal">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-2 mb-4
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
            <div
              className={`px-4 py-2 rounded-md shadow ${
                message.user === 'User'
                  ? 'bg-chatBgColor text-white'
                  : 'bg-white text-gray-500'
              }`}
            >
              {formatMessage(message.text)}
            </div>
            {message.user === 'User' && ( // 유저 이미지 표시
              <img className="w-[40px] h-[40px]" src={UserImg} alt="User" />
            )}
          </div>
        ))}
        {loading && (
          <span className="flex justify-items">
            <img className="w-[40px] h-[40px]" src={ChemistImg} alt="Chemist" />
            <PulseLoader
              color="#808080"
              size={10}
              className="px-4 py-3 rounded-md shadow bg-white text-gray-500 ml-[8px]"
            />
          </span>
        )}
        {/* 스크롤을 맨 아래로 이동*/}
        <div ref={autoScroll} />
      </div>
      {/* 유저 입력 필드 */}
      <div className="bottom-[0%] h-[11vh] w-full absolute flex items-center left-0 bg-white px-4">
        {/* 전체 배경이 차지하는 div */}
        <div className="flex w-full items-center">
          {/* 텍스트 입력 필드 */}
          <textarea
            className="flex-grow h-[100px] text-[16px] p-1 resize-none overflow-auto"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // Enter 키 기본 동작 방지 (줄바꿈 방지)
                handleSend();
              }
            }}
          />
          {/* 전송 버튼 */}
          <button className="h-full mb-16" onClick={handleSend}>
            <img className="w-[35px] h-[35px]" src={btn} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
