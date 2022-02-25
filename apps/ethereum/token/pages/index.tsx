import Head from 'next/head'
import { useToken } from '../source/useToken'
import { styled } from '../stitches.config';
import Nav from '../components/Nav';
import Container from '../components/Container';


export default function Home() {
  const { NewInstance } = useToken()

  return (
    <>
      <Head>
        <title>Hypverse Token Package</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Nav />
        <h1>Hypverse Token Package</h1>
        <Container>
          <div></div>
        </Container>

      </Main>
    </>
  )
}

const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
  justifyContent: 'center',
  '& h1': {
    marginTop: '2rem',
    fontWeight: 'lighter',
    fontSize: '1.5rem',

  }

})

const Button = styled('button', {
  backgroundColor: 'gainsboro',
  borderRadius: '9999px',
  fontSize: '13px',
  padding: '10px 15px',
  '&:hover': {
    backgroundColor: 'lightgray',
  },
});