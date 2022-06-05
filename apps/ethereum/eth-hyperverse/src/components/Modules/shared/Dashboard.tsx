import { styled } from '../../../../stitches.config'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { CreateInstance } from './CreateInstance'
import { getHighlighter, setCDN } from 'shiki'
import { useEthereum } from '@decentology/hyperverse-ethereum'
import { useERC721 } from '@decentology/hyperverse-evm-erc721'

import { MODULES } from '../../../consts'

import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { CreateInstanceERC721 } from './CreateInstanceERC721'

setCDN('https://unpkg.com/shiki/')
const DEFAULT_LANG = 'typescript'
const DEFAULT_THEME = 'material-darker'
const highlighterPromise = getHighlighter({
  theme: DEFAULT_THEME,
  langs: [DEFAULT_LANG],
})

export const Dashboard = () => {
  const router = useRouter()
  const { module } = router.query

  const { account } = useEthereum()
  const erc721 = useERC721()

  const { data: instance } = useQuery('instance', () => erc721.checkInstance!(account))

  const moduleDefault = module?.toString() ?? 'erc721'
  const dependencies = `yarn i @decentology/hyperverse @decentology/hyperverse-ethereum @decentology/hyperverse-${moduleDefault}`
  const dappstarter = MODULES[moduleDefault].dappstarter

  const hyperverseInitialize = `
    const hyperverse = initialize({
      blockchain: Ethereum,
      network: Network.Testnet,
      modules: [
        {
          bundle: ${MODULES[moduleDefault].name},
          tenantId: '${account ?? 'your account address'}',
        },
      ],
    });

`

  return (
    <ScrollArea>
      <Viewport>
        {console.log(!instance && (module === 'erc721'))}
        {!instance && module === 'erc721' && <CreateInstanceERC721 /> }
        {instance && (
          <>
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
        )}
      </Viewport>
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

const Viewport = styled(ScrollAreaPrimitive.Viewport, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
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
