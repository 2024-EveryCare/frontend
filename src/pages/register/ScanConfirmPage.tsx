import React from 'react';
import BackLayout from '../../components/BackLayout';
import CenterLayout from '../../components/CenterLayout';
import NavBar from '../../components/NavBar';
import SmallLogo from '../../components/SmallLogo';
import ScanConfirm from '../../components/register/ScanConfirm';

const ScanConfirmPage: React.FC = () => {
  return (
    <BackLayout>
        <CenterLayout>
          <SmallLogo></SmallLogo>
          <ScanConfirm></ScanConfirm>
        </CenterLayout>
        <NavBar></NavBar>
    </BackLayout>
  );
};

export default ScanConfirmPage;