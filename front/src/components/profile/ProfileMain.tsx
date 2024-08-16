import React from 'react'
import { Header, ProfileContainer, HeaderList } from "./ProfileStyled"
import { IconLogo } from '../login/LoginStyle'
import IcnGear from "../../assets/IcnGear.svg?react"

const profileMain = () => {
  return (
    <ProfileContainer>
      <Header>
        <div>
          <IconLogo />
        </div>
        <HeaderList>
          <ul>
            <li>Visualizar Perfil</li>
            <li>Seus Links</li>
            <li>Configurar Perfil</li>
          </ul>
        </HeaderList>
        <div>
          <IcnGear style={{cursor: "pointer"}} />
        </div>
      </Header>
    </ProfileContainer>
  )
}

export default profileMain
