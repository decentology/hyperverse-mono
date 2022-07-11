import React from 'react'
import { styled } from '../stitches.config'
import { Button } from './basics/Button'
import { InfoHeading } from './basics/InfoHeading'
import { Input } from './basics/Input'

type AdminProps = {
  heading: string
  info: string
  args: string[]
  buttonLabel: string
  onClick: () => void
}

export const AdminFunction = ({ heading, info, args, buttonLabel, onClick }: AdminProps) => {
  return (
    <Container>
      <InfoHeading heading={heading} info={info} variant="subHeading" />
      <Inputs>
        {args.map((arg) => (
          <Input key={arg} label={arg} />
        ))}
      </Inputs>
      <ButtonContainer>
        <Button label={buttonLabel} />
      </ButtonContainer>
    </Container>
  )
}

const Container = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  background: '$black200',
  borderRadius: 4,
  border: '1px solid $blue500',
  padding: '16px 18px',
})

const Inputs = styled('div', {
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: 12,

  div: {
    marginRight: '0.5rem',
    width: '100%',
    '&:last-child': {
      marginRight: 0,
    },
  },
})

const ButtonContainer = styled('div', {
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end',
})
