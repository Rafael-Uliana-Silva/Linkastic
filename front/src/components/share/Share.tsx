import React from 'react';
import { UserData } from '../../Context/UserContext';
import { IconLink, IconSeta } from '../profile/ProfileIcons';
import { ProfileCardContainer, LinkList } from '../profile/ProfileStyle';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import * as simpleIcons from 'simple-icons'; 
import { NavLink } from 'react-router-dom';

const ProfileCard = () => {
  const { username } = useParams<{ username: string }>();
  const [userData, setUserData] = React.useState<UserData>(); 
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);


  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3005/users/profile/${username}`);
        if (!response.ok) {
          throw new Error('Usuário não encontrado');
        }
        const user = await response.json();
        setUserData(user);
      } catch (err) {
        const errorMessage = (err as Error).message;
        console.error(errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);


  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;
  if (!userData) return <p>Usuário não encontrado.</p>;

  const links = Array.isArray(userData.links) ? userData.links : [];

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
    <div>
      <ProfileCardContainer>
        <img src={userData.img} alt={`${userData.username}'s imagem`} />
        <h1>{userData.username}</h1>
        <p>{userData.email}</p>
        <LinkList>
            {links.length === 0 ? (
              <li>
                <span>
                  <Link to={'/'}>Esse usuário ainda não tem links</Link>
                </span>
              </li>
            ) : (
              links.map((link) => (
                <Link to={link.link} target='blank' key={link._id}>
                  <li style={{ backgroundColor: getPlatformColor(link.title) || "#2D8633" }} className="neon">
                    {getPlatformIcon(link.title)}
                    <span>{link.title}</span>
                    <span><IconSeta /></span>
                  </li>
                </Link>
              ))
            )}
        </LinkList>
      </ProfileCardContainer>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <NavLink to={"/"} style={{ maxWidth: "30%" }} className='btn'>Voltar a página de login</NavLink>
      </div>
    </div>
  );
};

export default ProfileCard;
