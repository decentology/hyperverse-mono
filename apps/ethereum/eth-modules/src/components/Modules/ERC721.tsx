import { styled } from '../../../stitches.config'
import { ReadFunction } from './shared/CreateInstance'
import { Content, Root as Tabs } from '@radix-ui/react-tabs'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

import React from 'react'
import { ReadComponent } from './shared/ReadComponent'
import {
  ModuleContainer,
  Header,
  PanelTrigger,
  Heading,
  ContentContainer,
  ContentGrid,
  ModuleTabs,
} from './shared/ModuleStyles'
import { useERC721 } from '@decentology/hyperverse-evm-erc721'
import { useEthereum } from '@decentology/hyperverse-ethereum'

import { getHighlighter, setCDN } from 'shiki'
import { useQuery } from 'react-query'

setCDN('https://unpkg.com/shiki/')
const DEFAULT_LANG = 'typescript'
const DEFAULT_THEME = 'material-darker'
const highlighterPromise = getHighlighter({
  theme: DEFAULT_THEME,
  langs: [DEFAULT_LANG],
})

export const ERC721 = () => {
  const [activeTab, setActiveTab] = React.useState<ModuleTabs>(ModuleTabs.DASHBOARD)
  const { account } = useEthereum()
  const erc721 = useERC721()
  const { data: instance } = useQuery('instance', () => erc721.checkInstance!(account))

  const dependencies = `yarn i @decentology/hyperverse-ethereum @decentology/hyperverse-erc721`
  const dappstarter = `git clone https://github.com/decentology/hyperverse-mono.git`

  const hyperverseInitialize = `
    const hyperverse = initialize({
      blockchain: Ethereum,
      network: Network.Testnet,
      modules: [
        {
          bundle: ERC721,
          tenantId: '${account ?? 'your account address'}',
        },
      ],
    });

`

  return (
    <ModuleContainer>
      <Tabs
        defaultValue={ModuleTabs.DASHBOARD}
        onValueChange={(value) => {
          setActiveTab(value === ModuleTabs.DASHBOARD ? ModuleTabs.DASHBOARD : ModuleTabs.PLAYGROUND)
        }}
      >
        <Header>
          <PanelTrigger active={activeTab === ModuleTabs.DASHBOARD} value={ModuleTabs.DASHBOARD}>
            <Heading>Dashboard</Heading>
          </PanelTrigger>
          <PanelTrigger active={activeTab === ModuleTabs.PLAYGROUND} value={ModuleTabs.PLAYGROUND}>
            <Heading>Playground</Heading>
          </PanelTrigger>
        </Header>
        <Content value={ModuleTabs.DASHBOARD}>
          <ScrollArea>
            <Viewport>
              <ReadFunction />
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
                    <h3>NextJS</h3>
                    <Code code={dappstarter} theme={DEFAULT_THEME} />
                  </CodeContainer>
                </>
              )}
            </Viewport>
            <Scrollbar orientation="vertical">
              <Thumb />
            </Scrollbar>
          </ScrollArea>
        </Content>

        <ContentGrid value={ModuleTabs.PLAYGROUND}>
          <ReadComponent />
          <ReadComponent />
          <ReadComponent />
          <ReadComponent />
          <ReadComponent />
          <ReadComponent />
        </ContentGrid>
      </Tabs>
    </ModuleContainer>
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
