import styled, {css} from "styled-components";
import IcnGear from "../../assets/IcnGear.svg?react"

const hoverShadow = css `
  cursor: pointer;
  transition: 0.3s;
  &:hover{
    text-shadow: 0px 0px 10px currentcolor;
  }
`

const IconGear = styled(IcnGear)`
  ${hoverShadow}
  &:hover {
    filter: drop-shadow(0 0 5px #fff);
  }
`

const ProfileContainer = styled.div`
  max-width: 100%;
  padding: 30px;
  margin: 0 auto;
`

const Header = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background-color: #54A759;
  padding: 15px 30px;
`

const Footer = styled.div`
  background: #54A759;
  padding: 15px 0px;
  width: 100%;
  color: #fff;
  text-align: center;
`

const HeaderList = styled.ul`
  display: flex;
  align-items: center;
  li {
    color: #fff;
    display: flex;
    align-items: center;
    ${hoverShadow}
  }
  li + li {
    margin-left: 30px;
  }
  li.active {
    background: #2D8633;
    padding: 10px;
    border-radius: 10px;
  }
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
  p {
    margin: 15px 0px 60px 0px;
  }
  img {
    max-width: 100px;
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
  }
`

export { Header, Footer, ProfileContainer, HeaderList, IconGear, ProfileCard, LinkList }
