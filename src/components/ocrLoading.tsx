import React from 'react';

const ocrLoading: React.FC = () => {
  return (
    <div className="absolute bg-gray-100 w-[100%] h-[100%] top-[0%]">
      <div className="w-32 h-32 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin absolute bottom-[55%] left-[40%]"></div>
      <p className="W-[100%] text-xl text-gray-700 absolute bottom-[45%] left-[15%]">
        처방전 인식 중 입니다... (...최대 2분 소요)
      </p>
    </div>
  );
};

export default ocrLoading;
