import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import ProfileCard from './ProfileCard';
import { ConfigContainer, LinkCard, UserConfig, UserInfoContainer, ImageContainer, FormContainer } from './ProfileStyle';
import useUser from '../../Utils/useUser';
import Spinner from '../spinner/Spinner';
import defaultImg from "../../assets/defaultImg.svg";
import axios from 'axios';

const ProfileConfig = () => {
  const { data } = useUser();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (data) {
      setUsername(data.username);
      setEmail(data.email);
    }
  }, [data]);

  const handleSaveChanges = async () => {
    try {
      const updatedData: {
        username: string;
        email: string;
        oldPassword?: string;  
        newPassword?: string;  
      } = {
        username,
        email,
      };

      // Verifica se o usuário deseja alterar a senha
      if (oldPassword && newPassword) {
        updatedData.oldPassword = oldPassword;
        updatedData.newPassword = newPassword;
      }

      await axios.patch(`http://localhost:3005/users/${data?._id}`, updatedData);

      alert('Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      alert('Falha ao atualizar os dados.');
    }
  };

  if (!data) {
    return <Spinner />;
  }

  return (
    <div>
      <Header />
      <ConfigContainer>
        <LinkCard>
          <ProfileCard />
        </LinkCard>
        <UserConfig>
          <h1>Informações de Perfil</h1>
          <p>Configure aqui as informações de seu perfil</p>
          <UserInfoContainer>
            <ImageContainer>
              <p>Foto de perfil</p>
              <img src={defaultImg} alt="Imagem de perfil" />
              <input type="file" className='btn'/>
            </ImageContainer>
            <FormContainer>
              <p>Informações de usuário</p>
              <form>
                <label htmlFor="username">Nome</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="oldPassword">Senha Atual</label>
                <input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Digite a senha antiga"
                />
                <label htmlFor="newPassword">Nova senha</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Digite a nova senha"
                />
              </form>
            </FormContainer>
          </UserInfoContainer>
          <button className='btn' onClick={handleSaveChanges}>Salvar Alterações</button>
        </UserConfig>
      </ConfigContainer>
    </div>
  );
};

export default ProfileConfig;
