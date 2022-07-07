import React from 'react'
import { styled } from '../../stitches.config'
import { InfoBox } from '../InfoBox'
import { Modules, ModulesInfo } from '../../utils/constants'
import { NavLink } from '../basics/NavLink'

export const ModulesLanding = () => {
  return (
    <MoudlesContainer>
      <ModulesHeader>
        <Heading>Smart Modules</Heading>
        <NavLink to="/modules" css={{ fontSize: '0.8rem', marginRight: 0, }}>
          View all
        </NavLink>
      </ModulesHeader>
      <ModuleGrid>

        <InfoBox {...ModulesInfo[Modules.erc721]} />
        <InfoBox {...ModulesInfo[Modules.erc721]} />
        <InfoBox {...ModulesInfo[Modules.erc721]} />

      </ModuleGrid>
      <ModulesHeader>
        <Heading>Developer Resources</Heading>
      </ModulesHeader>
      <ModuleGrid variant="resources">
        <InfoBox
          to=""
          name="Hyperverse Documentation"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
          color="gradientPink"
          size="lg"
        />
        <InfoBox
          to=""
          name="Ethereum Documentation"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
          color="gradientYellow"
          size="lg"
        />
      </ModuleGrid>
    </MoudlesContainer>
  )
}

export const MoudlesContainer = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingX: 16,

  '@laptop': {
    paddingX: 0,
  },
})

export const ModulesHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  width: '100%',
})

export const Heading = styled('h1', {
  fontSize: '1.58rem',
})

export const ModuleGrid = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '1rem',
  '@laptop': {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gridTemplateRows: 'repeat(auto, minmax(350px, 1fr))',
    columnGap: '1rem',
  },

  variants: {
    variant: {
      resources: {
        '@laptop': {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(500px, 1fr))',
          gridTemplateRows: '340px',
        },
      },
    },
  },
})
