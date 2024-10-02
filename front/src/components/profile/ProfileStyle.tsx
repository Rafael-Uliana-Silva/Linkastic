import styled from "styled-components";

const ProfileContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
`

const ProfileCardContainer = styled.div`
  max-width: 300px;
  margin: 70px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  background: #83C687;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.2);
  p {
    margin: 15px 0px 60px 0px;
  }
  img {
    max-width: 150px;
    max-height: 150px;
    border-radius: 100%;
    margin-bottom: 30px;
  }
`

const LinkList = styled.ul`
  width: 80%;
  li {  
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background: #54A759;
    border-radius: 10px;
    margin-bottom: 30px;
    padding: 15px;
    transition: 0.3s;
  }

  .neon:hover {
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.5);
    transform: scale(1.05);
  }

`

const ConfigContainer = styled.div`
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
   /* Celular */
  @media (max-width: 480px) {
    flex-direction: column;
    justify-items: center;
    align-items: center;
  }
`

const LinkCard = styled.div`
  background-color: #F2F2F2;
  border-radius: 10px;
  width: 100%;
  max-width: 450px;
  @media (max-width: 480px) {
    max-width: 95%;
    margin-bottom: 30px;
  }
`

const LinkConfig = styled.div`
  background-color: #F2F2F2;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  padding: 30px;
  @media (max-width: 480px) {
    max-width: 80%;
    margin-bottom: 130px;
  }
`

const LinkAdd = styled.button`
  width: 100%;
  margin: 30px 0px;
  border-color: #2D8633;
  border-radius: 10px;
  color: #2D8633;
  padding: 10px 0;
  transition: 0.3s;
  &&:hover {
    cursor: pointer;
    box-shadow: 0 0 8px rgba(45, 134, 51, 0.8);
  }
`

const LinkTitle = styled.div`
  display: flex;
  justify-content: space-between;
`

const LinkListConfig = styled.div`
  background-color: #83C687;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`

const LinkInput = styled.div `
  display: flex;
  flex-direction: column;
  label {
    color: #fff;
    font-size: 14px;
  }
  input, select {
    margin-bottom: 15px;
  }
`

const UserConfig = styled.div`
  background-color: #F2F2F2;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  padding: 30px;
  @media (max-width: 480px) {
    max-width: 80%;
    flex-direction: column;
    margin-bottom: 130px;
  }
`

const UserInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  @media (max-width: 480px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const ImageContainer = styled.div`
  width: 45%;
  img {
    margin-top: 50px;
    max-height: 150px;
    max-width: 150px;
    border-radius: 200%;
  }
  text-align: center;
  @media (max-width: 480px) {
    width: 90%;
  }
`

const FormContainer = styled.div`
  width: 50%;
  form {
    padding-top: 25px;
    display: flex;
    flex-direction: column;
  }
  input {
    margin-bottom: 20px;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
`

export { ProfileContainer, ProfileCardContainer, LinkList, LinkConfig, ConfigContainer, LinkCard, LinkAdd, LinkListConfig, LinkInput, LinkTitle, UserConfig, UserInfoContainer, ImageContainer, FormContainer}
