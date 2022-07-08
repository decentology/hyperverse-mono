import type { NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../components/Header'
import { Container } from '../components/basics/Container'
import { ModulesLanding } from '../components/Landing/ModulesLanding'
import { Footer } from '../components/Footer'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hyperverse Ethereum</title>
        <meta name="description" content="Hyperverse Ethereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <Header />
        <ModulesLanding />
        <Footer />
      </section>
    </div>
  )
}

export default Home
