import styled from "styled-components";

const ProfileContainer = styled.div`
  max-width: 100%;
  padding: 30px;
  margin: 0 auto;
`

const Footer = styled.div`
  background: #54A759;
  position: fixed;
  bottom: 0;
  padding: 15px 0px;
  width: 100%;
  color: #fff;
  text-align: center;
`

const ProfileCard = styled.div`
  max-width: 20%;
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
    max-width: 100%;
    border-radius: 100%;
    border: 3px solid #000;
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
  li:hover {
    background: #2D8633;
  }
`

export { Footer, ProfileContainer, ProfileCard, LinkList,  }
