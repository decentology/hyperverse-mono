import React from 'react'
import { styled } from '../stitches.config'
import { gradientYellow, gradientPink } from '../utils/constants'
import { ArrowRight } from './basics/icons'
import { NavLink } from './basics/NavLink'

type InfoProps = {
  name: string
  description: string
  to: string
  color?: 'grey' | 'gradientPink' | 'gradientYellow'
  size?: 'md' | 'lg'
  external?: boolean
  comingSoon?: boolean
}

export const InfoBox = ({ name, description, to, color = 'grey', size = 'md', external, comingSoon }: InfoProps) => {
  return (
    <NavLink to={to} external={external} disabled={comingSoon}>
      <Container key={name} color={color} size={size} comingSoon={comingSoon}>
        <Info>
          <div>
            <HeaderContainer>
              <ModuleName>{name}</ModuleName>
              {comingSoon && <SubText>(Coming Soon)</SubText>}
            </HeaderContainer>
            <Description>{description}</Description>
          </div>

          <Bottom>
            <ArrowRight />
          </Bottom>
        </Info>
      </Container>
    </NavLink>
  )
}

const Container = styled('div', {
  borderRadius: 4,
  display: 'flex',
  cursor: 'pointer',
  position: 'relative',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: 200,
  height: '100%',
  paddingX: 24,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },

  '@laptop': {
    minHeight: 233,
  },

  variants: {
    comingSoon: {
      true: {
        opacity: 0.5,
        '&:hover': {
          opacity: 0.5,
          transform: 'scale(1)',
          boxShadow: 'none',
        },
      },
    },
    color: {
      grey: {
        background: '$black200',
        border: '1px solid $blue500',
        '&:hover': {
          boxShadow: '4px 4px 10px rgba(51, 45, 85, 0.6)',
        },
      },
      gradientPink: {
        ...gradientPink,
      },
      gradientYellow: {
        ...gradientYellow,
      },
    },
    size: {
      md: {
        h1: {
          fontSize: '1.2rem',
          fontFamily: '$mono',
        },
      },
      lg: {
        h1: {
          fontSize: '1.5rem',
          fontFamily: '$body',
        },
        p: {
          maxWidth: '80%',
          marginBottom: '4rem',
        },
      },
    },
  },
})

const ModuleName = styled('h1', {
  textTransform: 'capitalize',
  fontWeight: 400,
  margin: 0,
})

const Description = styled('p', {
  fontSize: '0.9rem',
  fontFamily: '$body',
})

const Bottom = styled('div', {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'flex-end',
  bottom: 20,
  right: 20,

  svg: {
    width: '25px',
  },
})

const Info = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1,
})

const HeaderContainer = styled('div', {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
})

const SubText = styled('p', {
  fontFamily: '$body',
  fontSize: '12px',
  lineHeight: '14px',
})
