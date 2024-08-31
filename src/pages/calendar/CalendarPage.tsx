import React, { useEffect } from 'react';
import BackLayout from '../../components/BackLayout';
import CenterLayout from '../../components/CenterLayout';
import NavBar from '../../components/NavBar';
import SmallLogo from '../../assets/SmallLogo.png';
import Calendar from '../../components/Calendar/Calendar';
import { useNavigate } from 'react-router';
import { getCookie, isCookieExpired } from '../../utils/cookie';
import { Link } from 'react-router-dom';
import chatBotImg from '../../assets/chatBot/Chatbot.png';

const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/chatBot');
  };
  useEffect(() => {
    const isLoggedIn = isCookieExpired('name');
    if (isLoggedIn) {
      return;
    } else {
      alert('로그인 후 이용가능 합니다.');
      navigate('/login');
    }
  }, []);
  return (
    <BackLayout>
      <CenterLayout margin="m-auto">
        <img
          src={chatBotImg}
          className="absolute w-[10%] h-[5%] right-[4%] top-[4.5%]"
          onClick={handleRedirect}
        ></img>
        <Link to="/" className="w-1/3 mt-3 ml-3">
          <img src={SmallLogo} alt="" className="w-1/3 mt-3 ml-3" />
        </Link>

        <Calendar />
        <NavBar></NavBar>
      </CenterLayout>
    </BackLayout>
  );
};

export default CalendarPage;
