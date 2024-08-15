import React from 'react';
import BackLayout from '../../components/BackLayout';
import CenterLayout from '../../components/CenterLayout';
import SmallLogo from '../../assets/SmallLogo.png';
import Profile from '../../components/myPage/Profile';
import Menu from './Menu';
import NavBar from '../../components/NavBar';

const MyPage: React.FC = () => {
  return (
    <BackLayout>
      <CenterLayout>
        <img src={SmallLogo} alt="Small Logo" className="w-1/3 mt-3 ml-3" />
        <Profile></Profile>
        <Menu></Menu>
        <NavBar></NavBar>
      </CenterLayout>
    </BackLayout>
  );
};

export default MyPage;
