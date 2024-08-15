import React from 'react'
import { LoginContainer, LoginForm, IconLogo } from './LoginStyle'

const Login = () => {

  return (
    <LoginContainer>
      <div className='logo'>
        <IconLogo />
        <h1>Linkastic</h1>
      </div>
      <LoginForm>
        <h1>Login</h1>
        <h2>Logue na sua conta usando suas informações cadastradas</h2>
        <form action="#">
          <label htmlFor="nome">Endereço de Email ou nome de usúario</label>
          <input type="text" id='nome'/>
          <label htmlFor="senha">Senha de acesso</label>
          <input type="password" id='senha'/>
          <p className='esqueceu'>Esqueceu a senha? <span>Clique aqui</span></p>
        </form>
        <div className='btn'>
          <p>Entrar</p>
        </div>
        <p className='criarConta'>Não tem uma conta?<span>Crie uma aqui</span></p>
      </LoginForm>
    </LoginContainer>
  )
}

export default Login
