import { styled } from '../../../../stitches.config'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { CreateInstance } from './CreateInstance'
import { getHighlighter, setCDN } from 'shiki'
import { useEthereum } from '@decentology/hyperverse-ethereum'
import { useERC721 } from '@decentology/hyperverse-evm-erc721'

import { MODULES } from '../../../consts'

import React, { useState } from 'react'
import { Skeleton } from '../../basics/Skeleton'
import { Instance } from './Instance'

setCDN('https://unpkg.com/shiki/')
const DEFAULT_LANG = 'typescript'
const DEFAULT_THEME = 'material-darker'
const highlighterPromise = getHighlighter({
  theme: DEFAULT_THEME,
  langs: [DEFAULT_LANG],
})

export const Dashboard = ({module,instance, isLoading, createInstance} : { module:string, instance: string, isLoading:boolean, createInstance: any}) => {
  const { account } = useEthereum()


  const dependencies = `yarn i @decentology/hyperverse @decentology/hyperverse-ethereum @decentology/hyperverse-${module}`
  const dappstarter = MODULES[module].dappstarter

  const hyperverseInitialize = `
    const hyperverse = initialize({
      blockchain: Ethereum,
      network: Network.Testnet,
      modules: [
        {
          bundle: ${MODULES[module].name},
          tenantId: '${account ?? 'your account address'}',
        },
      ],
    });

`


  return (
    <ScrollArea>
      {isLoading ? (
        <Skeleton>
          <SkeletonContainer />
        </Skeleton>
      ) : (
        <Viewport>
          {!account ? (
            <CenterContainer>Connect Your Wallet</CenterContainer>
          ) : !!instance ? (
            <>
              <Instance instance={instance} />
              <SubHeader>Get Started</SubHeader>
              <CodeContainer>
                <h3>Install Dependencies</h3>
                <Code code={dependencies} theme={DEFAULT_THEME} />
                <h3>Initialize Hyperverse</h3>
                <Code code={hyperverseInitialize} theme={DEFAULT_THEME} />
              </CodeContainer>
              <SubHeader>DappStarter</SubHeader>
              <CodeContainer>
                <h3>{dappstarter.app}</h3>
                <Code code={dappstarter.url} theme={DEFAULT_THEME} />
              </CodeContainer>
            </>
          ) : (
            <CreateInstance createInstanceFn={createInstance}/>
          )}
        </Viewport>
      )}
      <Scrollbar orientation="vertical">
        <Thumb />
      </Scrollbar>
    </ScrollArea>
  )
}

function Code({ code, theme }: { code: string; theme: string }) {
  const [innerHtml, setHtml] = React.useState('Loading...')
  React.useEffect(() => {
    highlighterPromise.then((highlighter) => {
      const html = highlighter.codeToHtml(code, DEFAULT_LANG, theme)
      setHtml(html)
    })
  }, [code, theme])
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
  maxWidth: 800,
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
    borderRadius: 14,
    border: '1px solid #eaeaea',
    marginBottom: 20,
    overflow: 'auto',
  },
})

const SCROLLBAR_SIZE = 2

const ScrollArea = styled(ScrollAreaPrimitive.Root, {
  width: '100%',
  height: 540,
  borderRadius: 4,
  overflow: 'hidden',
})

const SkeletonContainer = styled('div', {
  width: 200,
  height: 520,
})

const Viewport = styled(ScrollAreaPrimitive.Viewport, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
})

const CenterContainer = styled('div', {
  width: '100%',
  height: 500,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
})
const Scrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  padding: 2,
  background: '$blue200',
  transition: 'background 160ms ease-out',
  '&:hover': { background: '#342F4E' },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },
})

const Thumb = styled(ScrollAreaPrimitive.Thumb, {
  flex: 1,
  background: '#fff',
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  },
})
