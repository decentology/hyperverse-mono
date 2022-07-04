import React from 'react'
import { styled } from '../../stitches.config'
import { Root, Trigger, Content, Arrow } from '@radix-ui/react-hover-card'
import { Info } from './icons'

type InfoHeadingProps = {
  heading: string
  info: string
  variant?: 'heading' | 'subHeading'
}

export const InfoHeading = ({ heading, info, variant = 'heading' }: InfoHeadingProps) => {
  return (
    <Root>
      <Header>
        <Heading variant={variant}>{heading}</Heading>
        <StyledTrigger>
          <Info />
        </StyledTrigger>
      </Header>
      <StyledContent>{info}</StyledContent>
    </Root>
  )
}
const Heading = styled('h2', {
  variants: {
    variant: {
      heading: {
        fontSize: '1.4rem',
        marginRight: '1rem',
      },
      subHeading: {
        fontSize: '1rem',
        marginRight: '1rem',
        fontWeight: 500,
      },
    },
  },
})

const Header = styled('div', {
  display: 'flex',
  alignItems: 'center',
  background: 'transparent',
})

const StyledTrigger = styled(Trigger, {
  border: 'none',
  outline: 'none',
})

const StyledContent = styled(Content, {
  display: 'flex',
  background: '$grey200',
  color: '$black100',
  padding: '10px 15px',
  width: 300,
  marginTop: 10,
  borderRadius: 4,
})
