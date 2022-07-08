import type { NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../../components/Header'
import { InfoBox } from '../../components/InfoBox'
import { MoudlesContainer, Heading, ModuleGrid } from '../../components/Landing/ModulesLanding'
import { Footer } from '../../components/Footer'
import { Modules as ModulesKey, ModulesInfo } from '../../utils/constants'

const Modules: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hyperverse Ethereum</title>
        <meta name="description" content="Hyperverse Ethereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <Header />
        <MoudlesContainer>
          <Heading>Smart Modules</Heading>
          <ModuleGrid>
            {Object.values(ModulesKey).map((key) => {
              const comingSoon = !ModulesInfo[key].to
              return (
                <InfoBox
                  key={key}
                  to={comingSoon ? '/modules' : `${ModulesInfo[key].to}`}
                  name={ModulesInfo[key].name}
                  description={ModulesInfo[key].description}
                  comingSoon={comingSoon}
                />
              )
            })}
          </ModuleGrid>
        </MoudlesContainer>
        <Footer />
      </section>
    </div>
  )
}

export default Modules
