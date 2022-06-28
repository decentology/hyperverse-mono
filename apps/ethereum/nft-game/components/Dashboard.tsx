import React from "react"
import { styled } from "../stitches.config"
import { CreateInstance } from "./CreateInstance"
import { GetAttributes } from "./GetAtrributes"
import { TenantMint } from "./Mint"


export const Dashboard = () => {
  return (
    <Container>
    <Heading>NFTGame-1 Module</Heading>

      <SubContainer>

       <CreateInstance />
       <TenantMint />
       <GetAttributes />
       
      </SubContainer>
    </Container>
  )
}

const Container = styled('div', {
  height: '100%',
  marginTop: 50,
  paddingBottom: 80,
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