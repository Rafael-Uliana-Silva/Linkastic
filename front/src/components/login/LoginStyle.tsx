import styled from "styled-components";
import IcnLogo from "../../assets/logo.svg?react";
 
const LoginContainer = styled.div`
  max-width: 550px;
  margin: 0 auto 70px auto;
  .logo {
    display: flex;
    justify-content: center;
    margin: 60px 0;
  }
`

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #ECECEC;
  border-radius: 30px;
  padding: 30px;
  text-align: left;
  .error {
    color: red;
    margin-bottom: 30px;
    font-weight: 700;
  }
  h2 {
    margin-top: 15px;
    margin-bottom: 70px;
  }
  input {
    width: 100%;
    margin-bottom: 30px;
  }
  .esqueceu {
    font-size: 0.625rem;
  }
  .esqueceu span {
    color: #8A8A8A;
    text-decoration: underline;
    cursor: pointer;
  }
  .criarConta {
    text-align: center;
    max-width: 157px;
    margin: 0 auto;
  }
  .criarConta span {
    color: #2D8633;
    text-decoration: underline;
    cursor: pointer;
  }
`

const IconLogo = styled(IcnLogo)`
  margin-right: 15px;
`
 
export { LoginContainer, LoginForm, IconLogo};
