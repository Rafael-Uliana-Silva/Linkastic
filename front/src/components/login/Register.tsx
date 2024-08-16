import React from 'react'
import axios from 'axios';
import { LoginContainer, IconLogo, LoginForm } from './LoginStyle'
import { useNavigate, NavLink } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3001/register', { username, email, password });
      
      localStorage.setItem('token', response.data.token);
      
      navigate('/profile');
    } catch (err) {
      console.log(err)
      setError('Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <LoginContainer>
    <div className='logo'>
      <IconLogo />
      <h1>Linkastic</h1>
    </div>
    <LoginForm>
      <h1>Registro</h1>
      <h2>Faça seu registro em nossos serviços</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <label htmlFor="nome">Nome de usúario</label>
        <input 
          type="text" 
          id='nome'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          />
        <label htmlFor="email">Endereço de Email</label>
        <input 
          type="text" 
          id='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          />
        <label htmlFor="senha">Senha de acesso</label>
        <input 
          type="password" 
          id='senha'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <p className='esqueceu'>Esqueceu a senha? <span>Clique aqui</span></p>
        <button className='btn' type='submit'>
          <p>Registrar</p>
        </button>
      </form>
      <p className='criarConta'>Já tem conta?<NavLink to={'/'}><span>Entre nela aqui</span></NavLink></p>
    </LoginForm>
  </LoginContainer>
  )
}

export default Register
