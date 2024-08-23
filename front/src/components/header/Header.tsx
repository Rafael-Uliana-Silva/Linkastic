import React from 'react';
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

  const navItems = [
    { to: `/profile/${currentId}`, label: "Visualizar Perfil", icon: <IconOlho /> },
    { to: `/profile/${currentId}/links`, label: "Seus Links", icon: <IconLink /> },
    { to: `/profile/${currentId}/config`, label: "Configurar Perfil", icon: <IconPerfil /> },
  ];

  return (
    <HeaderContainer>
      <IconLogout />
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
