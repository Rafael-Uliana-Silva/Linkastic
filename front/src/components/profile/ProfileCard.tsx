import React from 'react';
import { IconLink, IconSeta } from './ProfileIcons';
import defaultImg from "../../assets/defaultImg.svg";
import { ProfileCardContainer, LinkList } from './ProfileStyle';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';
import useUser from '../../utils/useUser';

const ProfileCard = () => {
  const { data } = useUser();

  if (!data) {
    return <Spinner />;
  }

  const links = Array.isArray(data.links) ? data.links : [];

  return (
    <ProfileCardContainer>
      <img src={data.img || defaultImg} alt="Imagem de usúario" />
      <h1>{data.username}</h1>
      <p>{data.email}</p>
      <LinkList>
        {links.length === 0 ? (
          <li>
            <span>
              <Link to={'links'}>Comece a adicionar Links +</Link>
            </span>
          </li>
        ) : (
          links.map((link, index) => (
            <li key={index}>
              <span><IconLink /> {link.title}</span><span><IconSeta /></span>
            </li>
          ))
        )}
      </LinkList>
    </ProfileCardContainer>
  );
}

export default ProfileCard;
