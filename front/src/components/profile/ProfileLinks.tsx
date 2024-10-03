import React from 'react';
import Header from '../header/Header';
import ProfileCard from './ProfileCard';
import { ConfigContainer, LinkConfig, LinkCard, LinkAdd, LinkListConfig, LinkInput, LinkTitle } from './ProfileStyle';
import { IconRemove } from './ProfileIcons';
import Spinner from '../spinner/Spinner';
import useUser from '../../Utils/useUser';
import axios from 'axios';
import { siGithub, siInstagram, siX, siYoutube, siTwitch, siFacebook } from 'simple-icons/icons';

interface Link {
  _id: string;
  title: string;
  link: string;
}

const ProfileLinks = () => {
  const platforms = [
    { title: 'Outra' },
    { title: siGithub.title },
    { title: siInstagram.title },
    { title: siX.title },
    { title: siYoutube.title },
    { title: siTwitch.title },
    { title: siFacebook.title },
  ];

  const { data, loading, error } = useUser(); 
  const [links, setLinks] = React.useState<Link[]>([]); 

  React.useEffect(() => {
    if (data?.links) {
      setLinks(data.links as Link[]);
    }
  }, [data]);

  const url = `https://linkastic.onrender.com/users/${data?._id}/links`;

  const addLink = async () => {
    const newLink: Omit<Link, '_id'> = { title: "Novo Link", link: "https://www.exemplo.com" };

    try {
      const response = await axios.post(url, newLink);

      if (response.status === 201) {
        setLinks([...links, response.data as Link]);
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

  const changeLink = async (index: number, field: keyof Link, value: string) => {
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
  
  const handleClick = async () => {
    try {
      await Promise.all(
        links.map(async (link) => {
          if (link._id) {
            await axios.patch(`${url}/${link._id}`, link);
          }
        })
      );
    } catch (error) {
      console.error("Error saving links:", error);
    }
    window.location.reload()
  };

  return (
    <div>
      <Header />
      <ConfigContainer>
        <LinkCard>
          <ProfileCard />
        </LinkCard>
        <LinkConfig>
          <h1>Customize sua árvore de links</h1>
          <LinkAdd onClick={addLink}>
            + Adicionar novo link
          </LinkAdd>
          {loading ? (
            <Spinner />
          ) : (
            links.map((link, index) => (
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
                    {platforms.map((plataforma, index) =>
                      <option key={index} value={plataforma.title}>{plataforma.title}</option>
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
            ))
          )}
          {error && <div>Error loading links</div>}
          <button onClick={handleClick} className='btn'>Salvar alterações</button>
        </LinkConfig>
      </ConfigContainer>
    </div>
  );
};

export default ProfileLinks;
