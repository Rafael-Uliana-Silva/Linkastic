import React from 'react'
import axios from 'axios';
import { LoginContainer, LoginForm, IconLogo } from './LoginStyle'
import { NavLink } from 'react-router-dom';

const Esqueceu = () => {
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleReset = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null)

    try {
      await axios.post("http://localhost:3005/resetPassword", { email });
    } catch (err: any){
      setError(err.response?.data?.message || "Erro ao tentar redefinir senha, tente novamente")
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginContainer>
    <div className='logo'>
      <IconLogo />
      <h1>Linkastic</h1>
    </div>
    <LoginForm>
      <h1>Esqueceu a senha?</h1>
      <h2>Recupere ela aqui</h2>
      <form onSubmit={handleReset}>
        <label htmlFor="email">Email cadastrado</label>
        <input 
          type="email" 
          id='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          />
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <button className='btn' type='submit'>
          {loading ? 'Enviando...' : 'Enviar e-mail de redefinição'}
        </button>
      </form>
      <p className='criarConta'>Já tem conta?<NavLink to={'/'}><span>Entre nela aqui</span></NavLink></p>
    </LoginForm>
  </LoginContainer>
  )
}

export default Esqueceu
