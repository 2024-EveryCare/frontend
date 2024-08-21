import React, { useState } from 'react';

import ChemistImg from '../../assets/Chatbot.png';
import UserImg from '../../assets/dad.png';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>(
    [],
  );
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { user: 'User', text: input }]); //이전 메시지 저장 후, 키:값 형태로 객체 저장, 추후 메세지를 누가 보냈는지 구분하기 위함.
      setInput(''); // 입력창 비우기
    }
  };

  const handleSendAi = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { user: 'Ai', text: input }]); //이전 메시지 저장 후, 키:값 형태로 객체 저장, 추후 메세지를 누가 보냈는지 구분하기 위함.
      setInput(''); // 입력창 비우기
    }
  };

  return (
    <div className="h-[95%] w-[100%] bg-blue-100 p-4 space-y-4">
      {/* 메시지 표시 영역 */}
      <div className="space-y-4 overflow-y-auto max-h-[98%]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 
                ${ //메시지 저장시 키,값 쌍의 객체형식으로 저장
                  message.user === 'User' ? 'justify-end' : '' //유저가 맞다면 스타일에 justify-end를 둬서 오른쪽에 붙혀서 정렬, 아닐시(Ai약사) 기본 왼쪽정렬
                }`}
          >
            {message.user !== 'User' && ( //유저가 아닐경우(Ai약사) 약사 이미지
              <img
                className="w-[40px] h-[40px]"
                src={ChemistImg}
                alt="Chemist"
              />
            )}
            {/* state에 저장되어진 message 표시되는곳 */}
            <div className="min-w-[100px] bg-white p-2 rounded-md shadow">
              {message.text}
            </div>
            {message.user === 'User' && ( //유저가 맞을 경우 유저 이미지
              <img className="w-[40px] h-[40px]" src={UserImg} alt="User" />
            )}
          </div>
        ))}
      </div>

      {/* 유저 입력필드 */}
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

      {/* ai 약사 입력필드, api연동 되면 삭제예정 */}
      <div className="bottom-[10%] h-[3vh] w-[100%] absolute items-center space-x-2">
        <input
          className="flex-grow p-2 rounded-md shadow border border-gray-300 w-[80%]"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendAi();
            }
          }}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-md shadow"
          onClick={handleSendAi}
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default Chat;
