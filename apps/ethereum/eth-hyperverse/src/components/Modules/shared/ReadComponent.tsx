import { styled } from '../../../../stitches.config'
import { Button } from './CreateInstance'

const shortenHash = (hash: string = '', charLength: number = 6, postCharLength?: number) => {
  let shortendHash
  if (postCharLength) {
    shortendHash = hash.slice(0, charLength) + '...' + hash.slice(hash.length - postCharLength, hash.length)
  } else {
    shortendHash = hash.slice(0, charLength)
  }
  return shortendHash
}

type Props = {
  fn: any
  header: string
  description: string
  buttonText: string
  isAddress?: boolean
}

const dummy = {
  header: 'Mint',
  description: 'Mint a new token',
  buttonText: 'Mint',
}
export const ReadComponent = () => {
  return (
    <Box>
      <h4>{dummy.header}</h4>
      <p>{dummy.description}</p>
      <Button
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.1 },
        }}
      >
        {dummy.buttonText}
      </Button>
    </Box>
  )
}

const Box = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '$blue200',
  maxHeight: 200,
  maxWidth: 265,
  borderRadius: 14,
  fontFamily: '$mono',
  color: 'white',
  padding: '30px 20px',
  boxShadow: '2px 2px 2px #342F4E',
  '& h4': {
    marginTop: '10px',
    fontSize: '1.2rem',
    fontWeight: '500',
  },
  '& p': {
    margin: '10px 0 30px',
    fontSize: '0.8rem',
  },
})
