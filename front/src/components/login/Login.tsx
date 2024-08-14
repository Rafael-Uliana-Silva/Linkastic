import React from 'react'

const Login = () => {
  return (
    <div>
      <div>
        <h1>Linkastic</h1>
      </div>
      <div>
        <h1>Login</h1>
        <h2>Logue na sua conta usando suas informações cadastradas</h2>
        <form action="#">
          <label htmlFor="nome">Endereço de Email ou nome de usúario</label>
          <input type="text" id='nome'/>
          <label htmlFor="senha">Senha de acesso</label>
          <input type="password" id='senha'/>
          <p>Esqueceu a senha? Clique aqui</p>
        </form>
        <div className='btn'>
          <p>Entrar</p>
        </div>
        <p>Não tem uma conta?<span>Crie uma aqui</span></p>
      </div>
    </div>
  )
}

export default Login
