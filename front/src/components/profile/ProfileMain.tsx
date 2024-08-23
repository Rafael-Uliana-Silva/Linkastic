import React from 'react';
import Header from "../header/Header";
import { Footer, ProfileContainer, ProfileCard, LinkList } from "./ProfileStyle";
import { IconLink, IconSeta } from './ProfileIcons';
import defaultImg from "../../assets/defaultImg.svg"
import { Link, useParams } from 'react-router-dom';
import { UserContext } from "../../../Context/UserContext";

const ProfileMain = () => {
  const { id } = useParams();
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('UserContext must be used within a UserProvider');
  }
  const { fetchUserData, userData } = context;

  React.useEffect(() => {
    if (id) {
      fetchUserData(id);
    }
  }, [id, fetchUserData]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ProfileContainer>
        <Header />
        <ProfileCard>
          <img src={userData.img || defaultImg} alt="Imagem de usúario" />
          <h1>{userData.username}</h1>
          <p>{userData.email}</p>
          <LinkList>
            {userData.links.length === 0 ? (
              <li>
                <span>
                  <Link to={'links'}>Comece a adicionar Links +</Link>
                </span>
              </li>
            ) : (
              userData.links.map((link, index) => (
                <li key={index}>
                  <span><IconLink /> {link.title}</span><span><IconSeta /></span>
                </li>
              ))
            )}
          </LinkList>
        </ProfileCard>
      </ProfileContainer>
      <Footer>
        <p>Linkastic © 2024</p>
      </Footer>
    </div>
  );
};

export default ProfileMain;
