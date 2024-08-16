import styled from "styled-components";

const ProfileContainer = styled.div`
  max-width: 100%;
  background: #D9D9D9;
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

const HeaderList = styled.div`
  ul {
    display: flex;
  }
  ul li {
    color: #fff;
    cursor: pointer;
  }
  ul li + li {
    margin-left: 30px;
  }
`

export { Header, ProfileContainer, HeaderList }
