import React from 'react'
import axios from 'axios';
import { LoginContainer, LoginForm, IconLogo } from './LoginStyle'
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const Reset = () => {
  const [newPassword, setNewPassword] = React.useState("");
  const { token } = useParams()
  const navigate = useNavigate()
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false)

  const handleReset = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post(`https://linkastic.onrender.com/resetPassword/${token}`, { newPassword });
      alert("senha redefinida")
      navigate("/")
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
      <h1>Troque aqui a sua senha</h1>
      <h2>Digite a sua nova senha</h2>
      <form onSubmit={handleReset}>
        <label htmlFor="email">Nova senha</label>
        <input 
          type="password" 
          id='newPassword'
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          required
          />
        {error && <p className="error-message">{error}</p>}
        <button className='btn' type='submit'>
          {loading ? 'Enviando...' : 'Confirmar nova senha'}
        </button>
      </form>
      <p className='criarConta'>Já tem conta?<NavLink to={'/'}><span>Entre nela aqui</span></NavLink></p>
    </LoginForm>
  </LoginContainer>
  )
}

export default Reset
