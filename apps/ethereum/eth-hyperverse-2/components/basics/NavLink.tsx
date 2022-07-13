import React from 'react'
import Link from 'next/link'
import { styled } from '../../stitches.config'
import type { CSS } from '@stitches/react'

type LinkProps = {
  to: string
  children: React.ReactNode
  external?: boolean
  disabled?: boolean
  css?: CSS
}

export const NavLink = ({ children, to, external, disabled, css = {} }: LinkProps) => {
  const rel = external ? 'noopener noreferrer' : undefined
  const target = external ? '_blank' : undefined
  return (
    <Link href={to} passHref>
      <NavItem target={target} rel={rel} css={css} disabled={disabled}>
        {children}
      </NavItem>
    </Link>
  )
}

const NavItem = styled('a', {
  color: '$grey100',
  textDecoration: 'none',
  width: 'fit-content',
  marginX: 12,
  '&:hover': {
    opacity: 0.8,
  },

  variants: {
    disabled: {
      true: {
        pointerEvents: 'none',
        '&:hover': {
          opacity: 'unset',
        },
      },
    },
  },
})
