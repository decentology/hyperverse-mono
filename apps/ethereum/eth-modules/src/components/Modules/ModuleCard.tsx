import { styled } from '@stitches/react'
import { MODULES } from '../../consts'
import { ERC721 } from '../icons'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode } from 'react'

type ModuleProps = {
  name: string
  description: string
  Icon: ReactNode
  path: string
}

export const ModuleCard = ({ name, description, Icon, path }: ModuleProps) => {
  return (
    <Link href={path}>
      <ModuleContainer
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 },
        }}
      >
        <ModuleInfo>
          {Icon()}
          <h1>{name}</h1>
          <p>{description}</p>
        </ModuleInfo>
      </ModuleContainer>
    </Link>
  )
}

const ModuleContainer = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$blue100',
  width: 330,
  height: 240,
  boxShadow: '4px 4px 10px rgba(51, 45, 85, 0.6)',
  cursor: 'pointer',
  borderRadius: 14,

  '&:hover': {
    backgroundImage: 'linear-gradient(93deg, #8CC760 0%, #3898FF 100%)',
    color: '$black100',
    boxShadow: '4px 4px 10px rgba(51, 45, 85, 0.9)',
  },
})

const ModuleInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '80px 24px 8px',

  svg: {
    width: 25,
  },

  '*': {
    margin: '8px 0 0',
  },

  h1: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 400,
    textTransform: 'capitalize',
  },

  p: {
    fontSize: 12,
    lineHeight: 1.4,
  },
})
