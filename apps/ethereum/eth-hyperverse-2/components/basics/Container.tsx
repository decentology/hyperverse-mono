import React from 'react'
import { styled } from '../../stitches.config'

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <Box>{children}</Box>
}

const Box = styled('div', {
  position: 'relative',
  display: 'flex',
  border: '1px solid $grey400',
  padding: 16,
  '@desktop': {
    padding: 24,
  },
})
