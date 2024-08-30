import React, { useEffect } from 'react';
import BackLayout from '../../components/BackLayout';
import CenterLayout from '../../components/CenterLayout';
import NavBar from '../../components/NavBar';
import SmallLogo from '../../assets/SmallLogo.png';
import ScanConfirm from '../../components/register/ScanConfirm';
import { useNavigate } from 'react-router';
import { getCookie } from '../../utils/cookie';

const ScanConfirmPage: React.FC = () => {
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
        <img src={SmallLogo} alt="" className='className="w-1/3 mt-3 ml-3' />
        <ScanConfirm></ScanConfirm>
        <NavBar></NavBar>
      </CenterLayout>
    </BackLayout>
  );
};

export default ScanConfirmPage;
