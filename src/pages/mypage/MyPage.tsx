import React, { useEffect } from 'react';
import BackLayout from '../../components/BackLayout';
import CenterLayout from '../../components/CenterLayout';
import SmallLogo from '../../assets/SmallLogo.png';
import Profile from '../../components/myPage/Profile';
import Menu from './Menu';
import NavBar from '../../components/NavBar';
import { getCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const MyPage: React.FC = () => {
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
        <Link to="/" className="w-1/3 mt-3 ml-3">
          <img src={SmallLogo} alt="Small Logo" className="w-1/3 mt-3 ml-3" />
        </Link>
        <Profile></Profile>
        <Menu></Menu>
        <NavBar></NavBar>
      </CenterLayout>
    </BackLayout>
  );
};

export default MyPage;
