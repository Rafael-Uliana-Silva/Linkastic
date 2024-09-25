import React from 'react';
import Header from "../header/Header";
import ProfileCard from './ProfileCard';
import { ProfileContainer} from "./ProfileStyle";

const ProfileMain = () => {
  return (
    <div>
      <ProfileContainer>
        <Header />
        <ProfileCard />
      </ProfileContainer>
    </div>
  );
};

export default ProfileMain;
