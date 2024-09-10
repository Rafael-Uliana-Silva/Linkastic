import { LoginContainer } from '../login/LoginStyle'
import { NavLink } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <LoginContainer>
      <h1>Parece que houve um erro, retorne a página de login e tente novamente</h1>
      <NavLink to={"/"}>
        <button className='btn'>Voltar a página de login</button>
      </NavLink>
    </LoginContainer>
  )
}

export default ErrorPage
