import React, { useEffect, useState } from 'react';

import dad from '../../assets/dad.png';
import { memberInfo } from '../../service/member';

const Profile: React.FC = () => {
    const [name, setName] = useState<string>('에d브리');
  const [birth, setBirth] = useState<string>('?');
  const [age, setAge] = useState<string>('?');
  const [gender, setGender] = useState<string>('?');
  useEffect(() => {
    clickedLogout();
  }, []);
  const clickedLogout = async () => {
    const response = await memberInfo();
    setName(response.data.data.name);
    setAge(response.data.data.age);
    setBirth(response.data.data.birthdate);
    setGender(response.data.data.genderStr);
  };

  return (
    <div className="flex justify-center items-center mt-[5vh] m-auto w-[95%] h-[25vh] border border-sky-500 rounded-[15px]">
      <img src={dad} className="w-[50%] h-[70%]" alt="" />
      <div className="flex flex-col  w-[50%] h-[60%]">
        <p className="text-[25px] mt-[4vh] font-bold">{name}님</p>
        <p className="text-[16px] text-gray-400 mt-[2vh]">{birth}</p>
        <p className="text-[16px] text-gray-400 mt-[1vh]">
          만{age}세 / {gender}
        </p>
      </div>
    </div>
  );
};
export default Profile;
