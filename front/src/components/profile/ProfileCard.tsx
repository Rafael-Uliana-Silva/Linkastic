import { IconLink, IconSeta } from './ProfileIcons';
import defaultImg from "../../assets/defaultImg.svg";
import { ProfileCardContainer, LinkList } from './ProfileStyle';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';
import useUser from '../../Utils/useUser';
import * as simpleIcons from 'simple-icons'; 

const ProfileCard = () => {
  const { data } = useUser();

  if (!data) {
    return <Spinner />;
  }

  const links = Array.isArray(data.links) ? data.links : [];

  const getPlatformColor = (platform: string) => {
    const formattedPlatform = `si${platform.charAt(0).toUpperCase() + platform.slice(1).toLowerCase()}`;
    const icon = simpleIcons[formattedPlatform as keyof typeof simpleIcons];
    return icon?.hex ? `#${icon.hex}` : '#54A759';
  };

  const getPlatformIcon = (platform: string) => {
    const formattedPlatform = `si${platform.charAt(0).toUpperCase() + platform.slice(1).toLowerCase()}`;
    const icon = simpleIcons[formattedPlatform as keyof typeof simpleIcons];
    if (icon && icon?.svg) {

      return (
        <span
          dangerouslySetInnerHTML={{ __html: icon.svg }}
          style={{ width: '25px', height: '25px'}} 
        />
      );
    }
    
    return <IconLink />; 
  };

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
              <Link to={link.link} target='blank'>
                <li key={index} style={{ backgroundColor: getPlatformColor(link.title) || "#2D8633" }} className="neon" >
                  {getPlatformIcon(link.title)}
                  <span>{link.title}</span>
                  <span><IconSeta /></span>
                </li>
              </Link>
            ))
          )}
      </LinkList>
    </ProfileCardContainer>
  );
};

export default ProfileCard;
