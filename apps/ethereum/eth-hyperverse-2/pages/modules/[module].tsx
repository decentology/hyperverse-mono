import React from 'react'
import Head from 'next/head'
import { Header } from '../../components/Header'
import { Modules } from '../../components/Modules'
import { Footer } from '../../components/Footer'
import { useRouter } from 'next/router'

function Module() {
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>Hyperverse Ethereum</title>
        <meta name="description" content="Hyperverse Ethereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <Header />
        <Modules key={router.asPath} />
        <Footer />
      </section>
    </div>
  )
}

export default Module
