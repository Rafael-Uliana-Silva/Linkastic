import React from 'react';
import Header from "../header/Header";
import ProfileCard from './ProfileCard';
import { Footer, ProfileContainer} from "./ProfileStyle";

const ProfileMain = () => {
  return (
    <div>
      <ProfileContainer>
        <Header />
        <ProfileCard />
      </ProfileContainer>
      <Footer>
        <p>Linkastic © 2024</p>
      </Footer>
    </div>
  );
};

export default ProfileMain;
