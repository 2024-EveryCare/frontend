import React from 'react';

const Menu: React.FC = () => {
  return (
    <div className="flex flex-col justify-center w-[100%] h-[30%] bg-pink gap-[4vh]">
      <p className="text-[20px] font-bold ml-[3vh]">로그아웃</p>
      <p className="text-[20px] font-bold ml-[3vh]">회원 정보 수정</p>
      <p className="text-[20px] font-bold ml-[3vh]">비밀번호 변경</p>
      <p className="text-[20px] font-bold ml-[3vh]">처방 기록 확인하기</p>
    </div>
  );
};
export default Menu;
