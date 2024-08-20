import React from 'react'
import { Header, Footer, ProfileContainer, ProfileCard, HeaderList, IconGear, LinkList} from "./ProfileStyle"
import { IconLogo, IconLink, IconOlho, IconPerfil, IconSeta } from './ProfileIcons'
import Exemplo from "../../assets/ed.jpg"

const profileMain = () => {
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
        <ProfileCard >
          <img src={Exemplo}/>
          <h1>Usuário</h1>
          <p>Email@email.com</p>
          <LinkList>
            <li><span><IconLink /> Link 1</span><span><IconSeta /></span></li>
            <li><span><IconLink /> Link 2</span><span><IconSeta /></span></li>
            <li><span><IconLink /> Link 3</span><span><IconSeta /></span></li>
          </LinkList>
        </ProfileCard>
      </ProfileContainer>
      <Footer>
        <p>Linkastic © 2024</p>
      </Footer>
    </div>
  )
}

export default profileMain
