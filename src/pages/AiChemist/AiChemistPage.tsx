import React from 'react';
import BackLayout from '../../components/BackLayout';
import CenterLayout from '../../components/CenterLayout';
import NavBar from '../../components/NavBar';
import SmallLogo from '../../assets/SmallLogo.png';
import Chat from '../../components/AiChemist/Chat';
const AiChemistPage: React.FC = () => {
  return (
    <BackLayout>
      <CenterLayout>
        <img src={SmallLogo} alt="Small Logo" className="w-1/3 mt-3 ml-3" />
        <Chat></Chat>
      </CenterLayout>
    </BackLayout>
  );
};

export default AiChemistPage;
