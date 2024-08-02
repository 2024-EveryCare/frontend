import React from 'react';
import Magnify from '../../assets/pillInfoSearch/Magnify.gif';
import Magnify1 from '../../assets/pillInfoSearch/Magnify1.gif';
import Magnify2 from '../../assets/pillInfoSearch/Magnify2.gif';
import Spin from '../../assets/pillInfoSearch/Spin.gif';

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-[80vh]">
      <img src={Spin} alt="로딩" width="25%" />
    </div>
  );
};

export default Loading;
