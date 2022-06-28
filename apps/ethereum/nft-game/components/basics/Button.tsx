import React from 'react'
import { styled } from '../../stitches.config'
export const Button = ({ label, onClick }: { label: string; onClick?: () => void }) => {
  return <StyledButton onClick={onClick}>{label}</StyledButton>
}

const StyledButton = styled('button', {
  background: '#2679A1',
  backgroundSize: 'fill',
  border: 'none',
  borderRadius: 4,
  padding: '8px 10px',
  minWidth: 162,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
})
