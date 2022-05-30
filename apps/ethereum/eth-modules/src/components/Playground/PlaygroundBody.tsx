import Link from 'next/link'
import { useRouter } from 'next/router'
import { styled } from '../../../stitches.config'

export const PlaygroundBody = () => {
  const router = useRouter()
  const { module } = router.query
  return (
    <Container>
      <SubContainer>
        <h1>
          {module}
          &nbsp;Smart Module
        </h1>

        <Link href="https://faucet.paradigm.xyz/" passHref>
          <a target="_blank" rel="noreferrer">
            get rinkeby eth
          </a>
        </Link>
      </SubContainer>
      <ContentContainer />
    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

const SubContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  fontFamily: '$mono',
  fontWeight: '400',

  h1: {
    fontSize: 24,
    textTransform: 'capitalize',
    span: {
      textTransform: 'uppercase',
    },
  },

  a: {
    color: '$white100',
  },
})

const ContentContainer = styled('div', {
  marginTop: 10,
  width: 900,
  height: 630,
  background: '$blue100',
  borderRadius: 14,
})
