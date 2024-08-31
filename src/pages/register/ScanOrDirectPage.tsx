import React, { useEffect } from 'react';
import BackLayout from '../../components/BackLayout';
import CenterLayout from '../../components/CenterLayout';
import NavBar from '../../components/NavBar';
import ScanOrDirec from '../../components/register/ScanOrDirec';
import SmallLogo from '../../assets/SmallLogo.png';
import { useNavigate } from 'react-router';
import { getCookie } from '../../utils/cookie';
import { Link } from 'react-router-dom';

const ScanOrDirectPage: React.FC = () => {
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
          <img src={SmallLogo} className="w-1/3 mt-3 ml-3" />
        </Link>
        <ScanOrDirec></ScanOrDirec>
        <NavBar></NavBar>
      </CenterLayout>
    </BackLayout>
  );
};

export default ScanOrDirectPage;
