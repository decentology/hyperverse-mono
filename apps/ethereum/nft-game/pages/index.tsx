import type { NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../components/Header'
import { Dashboard } from '../components/Dashboard'


const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>NFT Game</title>
        <meta name="description" content="NFT Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <Header />
				<Dashboard />
      </section>
    </div>
  )
}

export default Home
