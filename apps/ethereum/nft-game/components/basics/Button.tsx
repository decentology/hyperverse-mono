import React from 'react'
import { styled } from '../../stitches.config'
export const Button = ({ label, disabled, onClick }: { label: string; disabled?: boolean, onClick?: () => void }) => {
  return <StyledButton onClick={onClick} disabled={disabled}>{label}</StyledButton>
}

const StyledButton = styled('button', {
  background: '#2679A1',
  border: 'none',
  borderRadius: 4,
  padding: '8px 10px',
  minWidth: 162,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    '&:hover': {
      transform: 'unset',
    }
  }
})
