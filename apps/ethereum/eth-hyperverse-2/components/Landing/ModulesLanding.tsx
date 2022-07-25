import React from 'react'
import { styled } from '../../stitches.config'
import { InfoBox } from '../InfoBox'
import { Modules, ModulesInfo } from '../../utils/constants'
import { NavLink } from '../basics/NavLink'

export const ModulesLanding = () => {
  const featured = Object.values(Modules).slice(0, 3)
  return (
    <MoudlesContainer>
      <ModulesHeader>
        <Heading>Smart Modules</Heading>
        <NavLink to="/modules" css={{ fontSize: '0.8rem', marginRight: 0 }}>
          View all
        </NavLink>
      </ModulesHeader>
      <ModuleGrid>
        {featured.map((key) => {
          const comingSoon = !ModulesInfo[key].to
          return (
            <InfoBox
              key={key}
              to={ModulesInfo[key].to}
              name={ModulesInfo[key].name}
              description={ModulesInfo[key].description}
              comingSoon={comingSoon}
              npm={ModulesInfo[key].npm}
            />
          )
        })}

      </ModuleGrid>
      <ModulesHeader>
        <Heading>Developer Resources</Heading>
      </ModulesHeader>
      <ModuleGrid variant="resources">
        <InfoBox
          to="https://docs.hyperverse.dev/"
          name="Hyperverse Documentation"
          description="Explore docs, tutorials, and examples to build dApps with the Hyperverse."
          color="gradientPink"
          size="lg"
          external
        />
        <InfoBox
          to="https://ethereum.org/en/developers/docs/"
          name="Ethereum Documentation"
          description="Learn about Ethereum, its tech stack, and advanced topics for dApp development."
          color="gradientYellow"
          size="lg"
          external
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
