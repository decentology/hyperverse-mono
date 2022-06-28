import React from "react"
import { styled } from "../stitches.config"
import { CreateInstance } from "./CreateInstance"
import { TenantMint } from "./Mint"


export const Dashboard = () => {
  return (
    <Container>
    <Heading>NFTGame-1 Module</Heading>

      <SubContainer>

       <CreateInstance />
       <TenantMint />
       
      </SubContainer>
    </Container>
  )
}

const Container = styled('div', {
  height: '100%',
  marginTop: 50,
})

const Heading = styled('h1', {
  fontSize: '1.6rem',
  paddingY: '1rem',
})

const SubContainer = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  rowGap: 16,
})