import React, { useEffect } from 'react';
import BackLayout from '../../components/BackLayout';
import CenterLayout from '../../components/CenterLayout';
import NavBar from '../../components/NavBar';
import SmallLogo from '../../assets/SmallLogo.png';
import BackBtn from '../../components/register/button/BackBtn';
import PillSearch from '../../components/register/PillSearch';
import { useNavigate } from 'react-router';
import { getCookie, isCookieExpired } from '../../utils/cookie';
import { Link } from 'react-router-dom';

const PillSearchPage: React.FC = () => {
  const navigate = useNavigate();
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
        <Link to="/" className="w-1/3 mt-3 ml-3">
          <img src={SmallLogo} alt="" className='w-1/3 mt-3 ml-3' />
        </Link>
        <BackBtn text="약 입력"></BackBtn>
        <PillSearch></PillSearch>
        <NavBar></NavBar>
      </CenterLayout>
    </BackLayout>
  );
};

export default PillSearchPage;
