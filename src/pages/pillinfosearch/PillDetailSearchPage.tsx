import React, { useEffect } from 'react';
import BackLayout from '../../components/BackLayout';
import CenterLayout from '../../components/CenterLayout';
import NavBar from '../../components/NavBar';
import SmallLogo from '../../assets/SmallLogo.png';
import PillDetailSearch from '../../components/pillinfosearch/PillDetailSearch';
import { useLocation, useNavigate } from 'react-router';
import { getCookie } from '../../utils/cookie';
import { Link } from 'react-router-dom';

const PillDetailSearchPage: React.FC = () => {
  const location = useLocation();
  const { drugName, imageUrl } = location.state || {};

  if (!drugName) {
    return <div>약 이름을 찾을 수 없습니다.</div>;
  }
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
        <PillDetailSearch drugName={drugName} imageUrl={imageUrl} />
        <NavBar></NavBar>
      </CenterLayout>
    </BackLayout>
  );
};

export default PillDetailSearchPage;
