import React, { useEffect } from 'react';
import BackLayout from '../../components/BackLayout';
import CenterLayout from '../../components/CenterLayout';
import NavBar from '../../components/NavBar';
import SmallLogo from '../../assets/SmallLogo.png';
import Chat from '../../components/AiChemist/Chat';
import { useNavigate } from 'react-router';
import { getCookie } from '../../utils/cookie';
const AiChemistPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = getCookie('name');
    if (isLoggedIn) {
      return;
    } else {
      alert('로그인 후 이용가능 합니다.');
      navigate('/login');
    }
  }, []);
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
