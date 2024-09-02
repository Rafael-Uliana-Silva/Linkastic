import styled, { css } from "styled-components";
import IcnLogo  from "../../assets/logo.svg?react";
import IcnLink from "../../assets/icnLink.svg?react"
import IcnOlho from "../../assets/icnOlho.svg?react"
import IcnPerfil from "../../assets/icnPerfil.svg?react"
import IcnSeta from "../../assets/icnSeta.svg?react"
import IcnRemove from "../../assets/icnRemove.svg?react"

const iconStyle = css`
  margin-right: 5px;
`

const IconLogo = styled(IcnLogo)`
  ${iconStyle}
`

const IconLink = styled(IcnLink)`
  ${iconStyle}
`

const IconOlho = styled(IcnOlho)`
  ${iconStyle}
`

const IconPerfil = styled(IcnPerfil)`
  ${iconStyle}
`

const IconSeta = styled(IcnSeta)`
  ${iconStyle}
  align-self: flex-end;
`

const IconRemove = styled(IcnRemove)`
  ${iconStyle}
  transition: 0.3s;
  cursor: pointer;
  margin-right: 0px;
  &:hover {
    filter: drop-shadow(0 0 5px #F45656);
  }
`

export {IconLogo, IconLink, IconOlho, IconPerfil, IconSeta, IconRemove};
