import styled, {css}from "styled-components";
import IcnGear from "../../assets/IcnGear.svg?react"
import IcnLogout from "../../assets/icnLogout.svg?react"

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
const IconLogout = styled(IcnLogout)`
  ${hoverShadow}
  &:hover {
    filter: drop-shadow(0 0 5px #fff);
  }
`

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 30px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background-color: #54A759;
  padding: 15px 30px;
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.2);
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
  li .active {
    background: #2D8633;
    padding: 10px;
    border-radius: 10px;
  }
`

export {HeaderContainer, HeaderList, IconGear, IconLogout}
