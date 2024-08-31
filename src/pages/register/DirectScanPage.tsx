import React, { useEffect } from 'react';
import DirectScan from '../../components/register/DirectScan';
import BackLayout from '../../components/BackLayout';
import CenterLayout from '../../components/CenterLayout';
import SmallLogo from '../../assets/SmallLogo.png';
import NavBar from '../../components/NavBar';
import { RegisterContextProvider } from '../../context/RegisterContext';
import { useNavigate } from 'react-router';
import { getCookie } from '../../utils/cookie';
import { Link } from 'react-router-dom';

const DirectScanPage: React.FC = () => {
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
      <CenterLayout margin="m-auto">
        <Link to="/" className="w-1/3 mt-3 ml-3">
          <img src={SmallLogo} alt="Small Logo" className="w-1/3 mt-3 ml-3" />
        </Link>
        <DirectScan></DirectScan>
        <NavBar></NavBar>
      </CenterLayout>
    </BackLayout>
  );
};

export default DirectScanPage;
