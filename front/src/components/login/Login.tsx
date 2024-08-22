import React from 'react'
import axios from 'axios';
import { LoginContainer, LoginForm, IconLogo } from './LoginStyle'
import { useNavigate, NavLink } from 'react-router-dom';
import { UserContext } from '../../../Context/UserContext';

const Login = () => {
  const [credential, setCredential] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();
  
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('UserContext must be used within a UserProvider');
  }
  const { setLoggedUserId } = context;

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/login", {credential, password});
      const userId = response.data.id
      setLoggedUserId(userId)
      navigate(`/profile/${userId}`);
    } catch (err) {
      console.log(err)
      setError("Credenciais inválidas")
    }
  }

  return (
    <LoginContainer>
      <div className='logo'>
        <IconLogo />
        <h1>Linkastic</h1>
      </div>
      <LoginForm>
        <h1>Login</h1>
        <h2>Logue na sua conta usando suas informações cadastradas</h2>
        {error && <p className="error" >{error}</p>}
        <form onSubmit={handleLogin}>
          <label htmlFor="nome">Endereço de Email ou nome de usúario</label>
          <input 
            type="text" 
            id='nome'
            value={credential}
            onChange={(event) => setCredential(event.target.value)}
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
            <p>Entrar</p>
          </button>
        </form>
        <p className='criarConta'>Não tem uma conta?<NavLink to={'/register'}><span>Crie uma aqui</span></NavLink></p>
      </LoginForm>
    </LoginContainer>
  )
}

export default Login
