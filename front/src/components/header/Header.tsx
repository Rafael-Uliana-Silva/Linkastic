import React, { useState } from 'react';
import { UserContext } from '../../Context/UserContext';
import useUser from "../../Utils/useUser";
import Spinner from '../spinner/Spinner';
import { HeaderContainer, HeaderList, IconShare, IconLogout } from './HeaderStyle';
import { IconOlho, IconPerfil, IconLink } from "../profile/ProfileIcons";
import { NavLink, useLocation } from 'react-router-dom';
import { Alert, Fade } from '@mui/material';

const extractIdFromPath = (path: string) => {
  const match = path.match(/\/profile\/(\w+)/);
  return match ? match[1] : null;
}

const Header = () => {
  const location = useLocation();
  const currentId = extractIdFromPath(location.pathname);
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("UserContext deve estar dentro de UserProvider");
  }

  const { data } = useUser();
  
  const [alertVisible, setAlertVisible] = useState(false);
  
  if (!data) {
    return <Spinner />;
  }

  const { logoutUser } = context;

  const handleCopy = async () => {
    const urlToCopy = `http://127.0.0.1:5173/user/profile/${data.username}`;
    try {
      await navigator.clipboard.writeText(urlToCopy);
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
    } catch (err) {
      console.error("Falha ao copiar: ", err);
    }
  };

  const navItems = [
    { to: `/profile/${currentId}/view`, label: "Visualizar Perfil", icon: <IconOlho /> },
    { to: `/profile/${currentId}/links`, label: "Seus Links", icon: <IconLink /> },
    { to: `/profile/${currentId}/config`, label: "Configurar Perfil", icon: <IconPerfil /> },
  ];

  return (
    <HeaderContainer>
      <IconLogout onClick={logoutUser} />
      <HeaderList>
        {navItems.map(({ to, label, icon }, index) => (
          <li key={index}>
            <span>{icon}</span>
            <NavLink 
              to={to} 
              className={({ isActive }) => isActive ? "active" : ""}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </HeaderList>
      <IconShare onClick={handleCopy} />

      <Fade in={alertVisible} timeout={{ enter: 500, exit: 500 }}>
        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
          <Alert severity="success">
            URL copiada com sucesso!
          </Alert>
        </div>
      </Fade>
    </HeaderContainer>
  );
}

export default Header;
