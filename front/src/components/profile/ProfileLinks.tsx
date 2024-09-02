import React from 'react'
import Header from '../header/Header'
import ProfileCard from './ProfileCard'
import { LinkConfigContainer, LinkConfig, LinkCard, LinkAdd, LinkListConfig, LinkInput, LinkTitle } from './ProfileStyle'
import { IconRemove } from './ProfileIcons'

const ProfileLinks = () => {

  return (
    <div>
      <Header />
      <LinkConfigContainer>
        <LinkCard>
          <ProfileCard />
        </LinkCard>
        <LinkConfig>
          <h1>Customize sua árvore de links</h1>
          <LinkAdd>
            + Adicionar novo link
          </LinkAdd>
          <LinkListConfig>
            <LinkTitle>
              <p>Link #1</p>
              <IconRemove />
            </LinkTitle>
            <LinkInput>
              <label htmlFor="plataforma">Plataforma</label>
              <select name='plataforma'>
                <option value="Github">Github</option>
                <option value="Facebook">Facebook</option>
              </select>
              <label htmlFor="link">Link</label>
              <input type="url" />
            </LinkInput>
          </LinkListConfig>
        </LinkConfig>
      </LinkConfigContainer>
    </div>
  )
}

export default ProfileLinks
