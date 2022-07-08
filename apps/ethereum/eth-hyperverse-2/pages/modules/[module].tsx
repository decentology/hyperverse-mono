import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../../components/Header'
import { Modules } from '../../components/Modules'
import { Footer } from '../../components/Footer'

function Module() {
  return (
    <div>
      <Head>
        <title>Hyperverse Ethereum</title>
        <meta name="description" content="Hyperverse Ethereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <Header />
        <Modules />
        <Footer />
      </section>
    </div>
  )
}

export default Module
