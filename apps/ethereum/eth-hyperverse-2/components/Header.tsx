import React from 'react'
import { Logo } from './Logo'
import { styled } from '../stitches.config'
import { HEADER_LINKS } from '../utils/constants'
import { Github } from './basics/icons'
import { NavLink } from './basics/NavLink'
import { useRouter } from 'next/router'
import { useEthereum } from '@decentology/hyperverse-ethereum'
import dynamic from 'next/dynamic'

export function Header() {
  const router = useRouter()
  const { pathname } = router
  const { Connect } = useEthereum()
  const ClientConnect = dynamic(() => Promise.resolve(Connect), { ssr: false })
  if (pathname.startsWith('/module')) {
    return (
      <HeaderContainer>
        <Section>
          <NavLink to="/" css={{ marginLeft: 0 }}>
            <Logo />
          </NavLink>
          
        </Section>
        <Section>
          <NavLink to={HEADER_LINKS.documentation} external>
            Docs
          </NavLink>
          <NavLink to={HEADER_LINKS.github} external>
            <Github />
          </NavLink>
          <ClientConnect />
        </Section>
      </HeaderContainer>
    )
  }
  return (
    <HeaderContainer>
      <Section>
        <NavLink to="/" css={{ marginLeft: 0 }}>
          <Logo full />
        </NavLink>
        {/* <NavLink to={HEADER_LINKS.ethereum} external>
          Ethereum
        </NavLink>
      */}

        <NavLink to={HEADER_LINKS.documentation} external>
          Documentation
        </NavLink>
      </Section>
      <Section>
        <NavLink to={HEADER_LINKS.github} external css={{ margin: 0 }}>
          <Github />
        </NavLink>
      </Section>
    </HeaderContainer>
  )
}

export const HeaderContainer = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  marginY: '2rem',
  maxWidth: '1300px',
  paddingY: '1rem',
})

export const Section = styled('div', {
  display: 'flex',
  alignItems: 'center',
})
