import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import ProfileCard from './ProfileCard';
import { ConfigContainer, LinkCard, UserConfig, UserInfoContainer, ImageContainer, FormContainer } from './ProfileStyle';
import useUser from '../../Utils/useUser';
import axios from 'axios';
import Alert, { AlertColor } from "@mui/material/Alert";

const ProfileConfig = () => {
  const { data } = useUser();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [imgSrc, setImgSrc] = useState(data?.img || '');
  
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success');
  const [showAlert, setShowAlert] = useState(false );

  useEffect(() => {
    if (data) {
      setUsername(data.username);
      setEmail(data.email);
      setImgSrc(data.img); 
    }
  }, [data]);

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImgSrc(reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        username,
        email,
        oldPassword: oldPassword || undefined, 
        newPassword: newPassword || undefined, 
        img: imgSrc, 
      };

      await axios.patch(`http://localhost:3005/users/${data?._id}`, updatedData, {
        headers: {
          'Content-Type': 'application/json', 
        },
      });
      setAlertMessage('Dados atualizados com sucesso! Recarregando...');
      setAlertSeverity('success');
      setShowAlert(true);
      window.location.reload()
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      setAlertMessage('Falha ao atualizar os dados. A imagem pode ser muito grande.');
      setAlertSeverity('error');
      setShowAlert(true);
    }
  };

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
              <img src={imgSrc} alt="Imagem de perfil" />
              <input type="file" className='btn' onChange={handleImage} />
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
          {showAlert && (
            <Alert 
              severity={alertSeverity} 
              onClose={() => setShowAlert(false)} 
              style={{ borderRadius: '50px' }}
              variant='outlined'
            >
              {alertMessage}
            </Alert>
          )}
          <button className='btn' onClick={handleSaveChanges}>Salvar Alterações</button>
        </UserConfig>
      </ConfigContainer>
    </div>
  );
};

export default ProfileConfig;
