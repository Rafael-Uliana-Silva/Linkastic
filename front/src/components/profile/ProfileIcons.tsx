import styled, { css } from "styled-components";
import IcnLogo  from "../../assets/logo.svg?react";
import IcnLink from "../../assets/icnLink.svg?react"
import IcnOlho from "../../assets/icnOlho.svg?react"
import IcnPerfil from "../../assets/icnPerfil.svg?react"
import IcnSeta from "../../assets/icnSeta.svg?react"

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

export {IconLogo, IconLink, IconOlho, IconPerfil, IconSeta};
