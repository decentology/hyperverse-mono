import React from 'react'
import { Logo } from './Logo'
import { styled } from '../stitches.config'
import { HEADER_LINKS } from '../utils/constants'
import { Github } from './basics/icons'
import { NavLink } from './basics/NavLink'
import { useEthereum } from '@decentology/hyperverse-ethereum/react'
import dynamic from 'next/dynamic'

export function Header() {
  const { Connect } = useEthereum()


  return (
    <HeaderContainer>
    <Section>
      <NavLink to="/" css={{ marginLeft: 0 }}>
        <Logo />
      </NavLink>
    </Section>
    <Section>
      <NavLink to={HEADER_LINKS.documentation} external>
        Documentation
      </NavLink>
      <NavLink to={HEADER_LINKS.github} external>
        <Github />
      </NavLink>
      <Connect  />
    </Section>
  </HeaderContainer>
  )
}

export const HeaderContainer = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  marginY: '3rem',
  maxWidth: '1300px',
  paddingY: '1rem',
})

export const Section = styled('div', {
  display: 'flex',
  alignItems: 'center',
})
