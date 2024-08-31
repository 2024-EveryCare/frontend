import React, { useEffect, useState } from 'react';
import BackLayout from '../../components/BackLayout';
import CenterLayout from '../../components/CenterLayout';
import NavBar from '../../components/NavBar';
import SmallLogo from '../../assets/SmallLogo.png';
import MainPage from '../../components/mainPage/MainPage';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { getCookie } from '../../utils/cookie';
import { Link } from 'react-router-dom';
import chatBotImg from '../../assets/chatBot/Chatbot.png';

const MainPg: React.FC = () => {
  const LogoStyle = {
    width: '30%',
    marginTop: '3%',
    marginLeft: '3%',
  };
  const navigate = useNavigate();

  // const { isLoggedIn, user, logout } = useAuth();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const user = getCookie('name');
    if (user) {
      setUserName(user);
    }
  });

  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleJoinClick = () => {
    navigate('/signup');
  };

  const handleRedirect = () => {
    navigate('/chatBot');
  };

  return (
    <BackLayout>
      <CenterLayout>
        <div className="flex justify-between">
          <Link to="/" style={LogoStyle}>
            <img src={SmallLogo} alt="" />
          </Link>

          <div className="flex justify-between">
            {userName ? (
              <>
                <span className="flex justify-center items-center text-sm text-gray-600 mt-5 mr-4">
                  {userName}님
                </span>
              </>
            ) : (
              <>
                <button
                  onClick={handleLoginClick}
                  className="flex justify-center items-center text-sm text-gray-600 mt-5 mr-4"
                >
                  Login
                </button>
                <button
                  onClick={handleJoinClick}
                  className="flex justify-center items-center w-[50px] h-[2.5vh] rounded-xl text-sm bg-blue-300 text-white mt-5 mr-4"
                >
                  Join
                </button>
              </>
            )}
          </div>
        </div>
        <MainPage />
        <img
          src={chatBotImg}
          className="absolute w-[10%] h-[6%] left-[3%] bottom-[12%]"
          onClick={handleRedirect}
        ></img>
        <NavBar></NavBar>
      </CenterLayout>
    </BackLayout>
  );
};

export default MainPg;
