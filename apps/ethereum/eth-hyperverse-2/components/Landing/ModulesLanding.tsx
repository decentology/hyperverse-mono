import React from 'react'
import { styled } from '../../stitches.config'
import { InfoBox } from '../InfoBox'
import { Modules, ModulesInfo } from '../../utils/constants'

export const ModulesLanding = () => {
  return (
    <MoudlesContainer>
      <ModulesHeader>
        <Heading>Smart Modules</Heading>
        {/* <NavLink to="/modules" external css={{ fontSize: '0.8rem' }}>
          View all
        </NavLink> */}
      </ModulesHeader>
      <ModuleGrid>
        {Object.values(Modules).map((key) => (
          <InfoBox key={key} {...ModulesInfo[key]} />
        ))}
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

const MoudlesContainer = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingX: 16,

  '@laptop': {
    paddingX: 0,
  },
})

const ModulesHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  width: '100%',
})

const Heading = styled('h1', {
  fontSize: '1.58rem',
})

const ModuleGrid = styled('div', {
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
