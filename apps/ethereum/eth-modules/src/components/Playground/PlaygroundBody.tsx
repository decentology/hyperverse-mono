import { useRouter } from 'next/router'
import { styled } from '../../../stitches.config'

export const PlaygroundBody = () => {
  const router = useRouter()
  const { module } = router.query
  return (
    <Container>
      <h1>
        <span>{module}</span>
        &nbsp;Smart Module
      </h1>
      <ContentContainer />
    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  h1: {
    fontFamily: '$mono',
    fontSize: 24,
    fontWeight: '400',
    textTransform: 'capitalize',

    span: {
      textTransform: 'uppercase',
    }
  },
})

const ContentContainer = styled('div', {
  marginTop: 10,
  width: 900,
  height: 630,
  background: '$blue100',
  borderRadius: 14,
})
