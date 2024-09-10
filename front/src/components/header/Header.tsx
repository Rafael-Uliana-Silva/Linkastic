import React from 'react';
import { UserContext } from '../../Context/UserContext';
import { HeaderContainer, HeaderList, IconGear, IconLogout } from './HeaderStyle';
import { IconOlho, IconPerfil, IconLink } from "../profile/ProfileIcons";
import { NavLink, useLocation } from 'react-router-dom';

const extractIdFromPath = (path: string) => {
  const match = path.match(/\/profile\/(\w+)/);
  return match ? match[1] : null;
}

const Header = () => {
  const location = useLocation();
  const currentId = extractIdFromPath(location.pathname);

  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("UserContext deve estar dentro de UserProvider")
  }

  const { logoutUser } = context

  const navItems = [
    { to: `/profile/${currentId}/view`, label: "Visualizar Perfil", icon: <IconOlho /> },
    { to: `/profile/${currentId}/links`, label: "Seus Links", icon: <IconLink /> },
    { to: `/profile/${currentId}/config`, label: "Configurar Perfil", icon: <IconPerfil /> },
  ];

  return (
    <HeaderContainer>
      <IconLogout onClick={logoutUser}/>
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
      <IconGear />
    </HeaderContainer>
  );
}

export default Header;
