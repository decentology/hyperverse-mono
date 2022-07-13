import React from 'react'
import { styled } from '../stitches.config'
import { Logo } from './Logo'
import { HEADER_LINKS } from '../utils/constants'
import { Section } from './Header'
import { NavLink } from './basics/NavLink'

export function Footer() {
  return (
    <FooterContainer>
      <Section>
        <NavLink to="/" css={{ marginLeft: 0 }}>
          <Logo />
        </NavLink>
      </Section>
      <Section>
        <NavLink to={HEADER_LINKS.decentology} external>
          Decentology
        </NavLink>
        <NavLink to={HEADER_LINKS.discord} external>
          Discord
        </NavLink>
        <NavLink to={HEADER_LINKS.twitter} external>
          Twitter
        </NavLink>
      </Section>
    </FooterContainer>
  )
}

const FooterContainer = styled('header', {
  borderTop: '1px solid $grey400',
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  maxWidth: '1300px',
  margin: '3rem 0 1rem',
  paddingY: '1.5rem',
})
