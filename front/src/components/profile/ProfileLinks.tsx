import React from 'react';
import Header from '../header/Header';
import ProfileCard from './ProfileCard';
import { LinkConfigContainer, LinkConfig, LinkCard, LinkAdd, LinkListConfig, LinkInput, LinkTitle } from './ProfileStyle';
import { IconRemove } from './ProfileIcons';
import useUser from '../../Utils/useUser';
import axios from 'axios';
import Spinner from '../spinner/Spinner';
import { siGithub, siInstagram, siX, siYoutube, siTwitch, siFacebook } from 'simple-icons/icons';

const ProfileLinks = () => {

  const platforms = [
    { title: siGithub.title, hex: `#${siGithub.hex}`, svg: siGithub.svg },
    { title: siInstagram.title, hex: `#${siInstagram.hex}`, svg: siInstagram.svg },
    { title: siX.title, hex: `#${siX.hex}`, svg: siX.svg },
    { title: siYoutube.title, hex: `#${siYoutube.hex}`, svg: siYoutube.svg },
    { title: siTwitch.title, hex: `#${siTwitch.hex}`, svg: siTwitch.svg },
    { title: siFacebook.title, hex: `#${siFacebook.hex}`, svg: siFacebook.svg },
    { title: 'Outra', hex: '#000000', svg: '' }
  ];


  const { data } = useUser();
  const [links, setLinks] = React.useState(data?.links || []);
  if (!data) {
    return <Spinner />;
  }
  const url = `http://localhost:3005/users/${data._id}/links`;

  const addLink = async () => {
    const newLink = { title: "Novo Link", link: "https://www.exemplo.com" };
  
    try {
      const response = await axios.post(url, newLink);
  
      if (response.status === 201) {
        setLinks([...links, response.data]);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error adding link:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const removeLink = async (index: number) => {
    const linkId = links[index]._id;
    if (!linkId) return;

    try {
      await axios.delete(`${url}/${linkId}`);
      const newLinks = links.filter((_, i) => i !== index);
      setLinks(newLinks);
    } catch (error) {
      console.error("Error removing link:", error);
    }
  };

  const changeLink = async (index: number, field: string, value: string) => {
    const updatedLinks = [...links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setLinks(updatedLinks);

    const updatedLink = updatedLinks[index];
    const linkId = updatedLink._id;

    if (linkId) {
      try {
        await axios.patch(`${url}/${linkId}`, updatedLink);
      } catch (error) {
        console.error("Error updating link:", error);
      }
    }
  };

  return (
    <div>
      <Header />
      <LinkConfigContainer>
        <LinkCard>
          <ProfileCard />
        </LinkCard>
        <LinkConfig>
          <h1>Customize sua árvore de links</h1>
          <LinkAdd onClick={addLink}>
            + Adicionar novo link
          </LinkAdd>
          {links.map((link, index) => (
            <LinkListConfig key={link._id}>
              <LinkTitle>
                <p>{`Link #${index + 1}`}</p>
                <IconRemove onClick={() => removeLink(index)} />
              </LinkTitle>
              <LinkInput>
                <label htmlFor={`plataforma-${index}`}>Plataforma</label>
                <select
                  name={`plataforma-${index}`}
                  value={link.title}
                  onChange={(e) => changeLink(index, 'title', e.target.value)}
                >
                  {platforms.map((plataforma) =>
                    <option value={plataforma.title}>{plataforma.title}</option>
                  )}
                </select>
                <label htmlFor={`link-${index}`}>Link</label>
                <input
                  type="url"
                  name={`link-${index}`}
                  value={link.link}
                  onChange={(e) => changeLink(index, 'link', e.target.value)}
                />
              </LinkInput>
            </LinkListConfig>
          ))}
        </LinkConfig>
      </LinkConfigContainer>
    </div>
  );
};

export default ProfileLinks;
