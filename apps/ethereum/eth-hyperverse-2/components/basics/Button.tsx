import React from 'react'
import { keyframes, styled } from '../../stitches.config'

type ButtonProps = {
  label: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  loadingLabel?: string
}


export const Button = ({ label, onClick, disabled, loading,loadingLabel }: ButtonProps) => {
  return <StyledButton onClick={onClick} disabled={disabled} loading={loading}>
    {loading ? loadingLabel : label}
  </StyledButton>
}


const ellipsis = keyframes({
  to: {
    width: '1.25em'
  }
})

const StyledButton = styled('button', {
  background: '$blue100',
  color: '#fff',
  fontWeight: 400,
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

  variants: {
    loading: {
        true: {
          '&:after': {
            overflow: 'hidden',
            display: 'inline-block',
            verticalAlign: 'middle',
            animation: `${ellipsis} 1s steps(4, end) infinite`,
            content: "...",
            width: 0
          }
        
      }
    }
  }
})
