import React from 'react'
import { AdminFunction } from '../AdminFunction'
import { styled } from '../../stitches.config'
import { useEthereum } from '@decentology/hyperverse-ethereum/react'
import { useERC721 } from '@decentology/hyperverse-evm-erc721/react'


export const ERC721Dashboard = () => {

  const { account } = useEthereum()
  const erc721 = useERC721()


  
  return (
    <Dashboard>
      <AdminFunction
        heading="Initialize Collection (optional)"
        info="This is an optional step. If you do not want to initialize a collection, you can skip this step."
        args={['Collection Price', 'Collection Quantity', 'Max Per User']}
        buttonLabel="Initialize Collection"
        onClick={() => {}}
      />
      <AdminFunction
        heading="Mint"
        info="Mint a new token to the collection."
        args={['Reciever', 'Token URI']}
        buttonLabel="Mint Token"
        onClick={() => {}}
      />
      <Container>
        <AdminFunction
          heading="Set Base URI"
          info="Set the base URI for the token. This is the URI that will be used to view your token on marketplaces."
          args={['Base URI']}
          buttonLabel="Set Base URI"
          onClick={() => {}}
        />
        <AdminFunction
          heading="Set Mint Permission"
          info="Used to allow or prevent users for mintint tokens from your collection"
          args={['Mint Permission']}
          buttonLabel="Set Permission"
          onClick={() => {}}
        />
      </Container>
    </Dashboard>
  )
}

const Dashboard = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  rowGap: 16,
  '@desktop': {
    rowGap: 24,
  },
})

const Container = styled('div', {
  display: 'flex',
  width: '100%',

  div: {
    width: '100%',
    marginRight: '0.5rem',
    '&:last-child': {
      marginRight: 0,
    },
  },
})
