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
      const response = await axios.post('https://linkastic.onrender.com/register', { username, email, password });
      
      localStorage.setItem('token', response.data.token);
      
      navigate('/');
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("Erro no servidor. Tente novamente");
      }
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
      {error && <p className='error'>{error}</p>}
      <form onSubmit={handleRegister}>
        <label htmlFor="nome">Nome de usúario</label>
        <input 
          type="text" 
          id='nome'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          />
        <label htmlFor="email">Endereço de Email</label>
        <input 
          type="email" 
          id='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          />
        <label htmlFor="senha">Senha de acesso</label>
        <input 
          type="password" 
          id='senha'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
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
