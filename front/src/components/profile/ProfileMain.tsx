import React from 'react';
import { Header, Footer, ProfileContainer, ProfileCard, HeaderList, IconGear, LinkList } from "./ProfileStyle";
import { IconLogo, IconLink, IconOlho, IconPerfil, IconSeta } from './ProfileIcons';
import { useParams } from 'react-router-dom';
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
        <Header>
          <IconLogo />
          <HeaderList>
            <li className='active'><span><IconOlho /></span>Visualizar Perfil</li>
            <li><span><IconLink /></span>Seus Links</li>
            <li><span><IconPerfil /></span>Configurar Perfil</li>
          </HeaderList>
          <IconGear />
        </Header>
        <ProfileCard>
          <img src={userData.img || 'default-img.png'} alt="Profile" />
          <h1>{userData.username}</h1>
          <p>{userData.email}</p>
          <LinkList>
            {userData.links.map((link, index) => (
              <li key={index}>
                <span><IconLink /> {link.title}</span><span><IconSeta /></span>
              </li>
            ))}
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
