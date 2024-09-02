import React from 'react'
import styled from 'styled-components'
import icnSpinner from "../../assets/icnSpinner.svg?react"

const SpinnerContainer = styled.div`
  width: 150px;
  padding-top: 30px;
  margin: 0 auto;
`

const IconSpinner = styled(icnSpinner) `
  display: block;
`

const Spinner = () => {
  return (
    <SpinnerContainer>
      <h1>Carregando...</h1>
      <IconSpinner />
    </SpinnerContainer>
  )
}

export default Spinner
