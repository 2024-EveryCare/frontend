import React from 'react';

import dad from '../../assets/dad.png';

const Profile: React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-[5vh] m-auto w-[95%] h-[25vh] border border-sky-500 rounded-[15px]">
      <img src={dad} className="w-[50%] h-[70%]" alt="" />
      <div className="flex flex-col  w-[50%] h-[60%]">
        <p className="text-[25px] mt-[4vh] font-bold">에브리님</p>
        <p className="text-[16px] text-gray-400 mt-[2vh]">1999.10.08</p>
        <p className="text-[16px] text-gray-400 mt-[1vh]">만 22세 남</p>
      </div>
    </div>
  );
};
export default Profile;
