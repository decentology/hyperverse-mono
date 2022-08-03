import React from 'react'
import { styled } from '../../stitches.config'

type InputProps = {
  label: string
  placeholder?: string
}

export const Input = ({ label, placeholder = label }: InputProps) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <StyledInput placeholder={placeholder} />
    </InputContainer>
  )
}

export const InputContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: '$black100',
  border: '1px solid $blue500',
  padding: '12px 16px',
  borderRadius: 4,
  maxHeight: 60,
})

export const Label = styled('label', {
  textTransform: 'uppercase',
  fontSize: 12,
  fontWeight: 700,
  paddingX: 4,
})

export const StyledInput = styled('input', {
  fontFamily: '$body',
  background: 'transparent',
  border: 'none',
  paddingX: 4,
  height: '30px',
  color: '$grey50',
  '&:focus': {
    outline: 'none',
  },
})
