import React from 'react';
import BackLayout from '../../components/BackLayout';
import CenterLayout from '../../components/CenterLayout';
import NavBar from '../../components/NavBar';
import SmallLogo from '../../assets/SmallLogo.png';
import PillDetailSearch from '../../components/pillinfosearch/PillDetailSearch';
import { useLocation } from 'react-router';

const PillDetailSearchPage: React.FC = () => {
  const location = useLocation();
  const { drugName, imageUrl } = location.state || {};

  if (!drugName) {
    return <div>약 이름을 찾을 수 없습니다.</div>;
  }

  return (
    <BackLayout>
      <CenterLayout margin="m-auto">
        <img src={SmallLogo} alt="Small Logo" className="w-1/3 mt-3 ml-3" />
        <PillDetailSearch drugName={drugName} imageUrl={imageUrl} />
        <NavBar></NavBar>
      </CenterLayout>
    </BackLayout>
  );
};

export default PillDetailSearchPage;
