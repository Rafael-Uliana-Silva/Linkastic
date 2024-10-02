import { LoginContainer } from '../login/LoginStyle'
import { NavLink } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <LoginContainer>
      <h1 style={{marginTop: "80px", textAlign: "center"}}>
        Parece que houve um erro ou a página que você estava buscando não existe, retorne a página de login e tente novamente
      </h1>
      <NavLink to={"/"}>
        <button className='btn'>Voltar a página de login</button>
      </NavLink>
    </LoginContainer>
  )
}

export default ErrorPage
