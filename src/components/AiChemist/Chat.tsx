import React, { useState } from 'react';

import ChemistImg from '../../assets/Chatbot.png';
import UserImg from '../../assets/dad.png';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { user: 'User', text: input }]);
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
            className={`flex items-center space-x-2 ${
              message.user === 'User' ? 'justify-end' : ''
            }`}
          >
            {message.user !== 'User' && (
              <img
                className="w-[40px] h-[40px]"
                src={ChemistImg}
                alt="Chemist"
              />
            )}
            <div className="min-w-[100px] bg-white p-2 rounded-md shadow">
              {message.text}
            </div>
            {message.user === 'User' && (
              <img className="w-[40px] h-[40px]" src={UserImg} alt="User" />
            )}
          </div>
        ))}
      </div>

      {/* 입력 필드 및 전송 버튼 */}
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