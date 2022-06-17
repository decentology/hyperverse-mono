import { styled } from '../../../../stitches.config'
import { CreateInstance } from './CreateInstance'
import { ScrollArea, ViewportStyled, ScrollbarStyled, ThumbStyled } from './ModuleStyles'
import { getHighlighter, setCDN } from 'shiki'
import { useEthereum } from '@decentology/hyperverse-ethereum'
import { useERC721 } from '@decentology/hyperverse-evm-erc721'

import { MODULES } from '../../../consts'

import React, { useState } from 'react'
import { Skeleton } from '../../basics/Skeleton'
import { Instance } from './Instance'
import { Loader } from '../../basics/Loader'

setCDN('https://unpkg.com/shiki/')
const DEFAULT_LANG = 'jsx'


const DEFAULT_THEME = 'material-darker'
const highlighterPromise = getHighlighter({
  theme: DEFAULT_THEME,
  langs: [DEFAULT_LANG, 'sh'],
})

type DashboardType = {
  module: string
  instance: string
  isLoading: boolean
  createInstance: any
  txnLoading: boolean
}

export const Dashboard = ({ module, instance, isLoading, createInstance, txnLoading }: DashboardType) => {
  const { account } = useEthereum()
	console.log(txnLoading);

  const dependencies = `yarn add @decentology/hyperverse @decentology/hyperverse-ethereum @decentology/hyperverse-${module}`
  //@ts-ignore
  const dappstarter = MODULES[module].dappstarter

  //@ts-ignore
  let moduleName = MODULES[module].name

  const hyperverseInitialize = `
    const hyperverse = initialize({
      blockchain: Ethereum,
      network: Network.Testnet,
      modules: [
        {
          
          bundle: ${moduleName},
          tenantId: '${account ?? 'your account address'}',
        },
      ],
    });


    <Provider initialState={hyperverse}>
      // Input your component here
    </Provider>

`

  return (
    <ScrollArea>
      {isLoading ? (
        <Skeleton>
          <SkeletonContainer />
        </Skeleton>
      ) : (
        <ViewportStyled>
          {!account ? (
            <CenterContainer>Connect Your Wallet</CenterContainer>
          ) : !!instance ? (
            <>
              {/* <Loader/> */}
              <Instance instance={instance} />
              <SubHeader>Get Started</SubHeader>
              <CodeContainer>
                <h3>Install Dependencies</h3>
                <Code code={dependencies} theme={DEFAULT_THEME} />
                <h3>Initialize Hyperverse</h3>
                <Code code={hyperverseInitialize} theme={DEFAULT_THEME} />
              </CodeContainer>
              {dappstarter && (
                <>
                  <SubHeader>DappStarter</SubHeader>
                  {/* <CodeContainer>
                    <h3>{dappstarter.app}</h3>
                    <Code code={dappstarter.url} theme={DEFAULT_THEME} lang="sh" />
                  </CodeContainer> */}
                </>
              )}
            </>
          ) : (
            <CreateInstance createInstanceFn={createInstance} txnLoading={txnLoading}/>
          )}
        </ViewportStyled>
      )}
      <ScrollbarStyled orientation="vertical">
        <ThumbStyled />
      </ScrollbarStyled>
    </ScrollArea>
  )
}

function Code({ code, theme, lang=DEFAULT_LANG }: { code: string; theme: string; lang?:string }) {
  const [innerHtml, setHtml] = React.useState('Loading...')

  React.useEffect(() => {
    highlighterPromise.then((highlighter) => {
      const html = highlighter.codeToHtml(code, lang, theme)
      setHtml(html)
    })
  }, [code, theme, lang])
  return <div dangerouslySetInnerHTML={{ __html: innerHtml }} />
}

const SubHeader = styled('h3', {
  fontFamily: '$mono',
  fontWeight: '400',
  fontSize: 16,
  margin: '20px 0',
})

const CodeContainer = styled('div', {
  background: '$blue200',
  width: '95%',
  borderRadius: 14,
  padding: 20,
  marginBottom: 20,
  boxShadow: '2px 2px 2px #342F4E',

  h3: {
    fontFamily: '$mono',
    fontWeight: '400',
    fontSize: 14,
    marginBottom: 10,
  },
  '& pre:first-child': {
    padding: 10,
  },
  '& pre': {
    fontSize: 14,
    borderRadius: 14,
    border: '1px solid #eaeaea',
    marginBottom: 20,
  },
})

const SkeletonContainer = styled('div', {
  width: 200,
  height: 520,
})

export const CenterContainer = styled('div', {
  width: '100%',
  height: 500,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
})
