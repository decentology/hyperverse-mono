import { Dashboard } from './shared/Dashboard'
import { Content, Root as Tabs } from '@radix-ui/react-tabs'
import React, { useEffect } from 'react'
import {
  ModuleContainer,
  Header,
  PanelTrigger,
  Heading,
  ModuleTabs,
  ScrollArea,
  ViewportStyled,
  ScrollbarStyled,
  ThumbStyled,
} from './shared/ModuleStyles'

import { useERC721 } from '@decentology/hyperverse-evm-erc721'
import { useEthereum } from '@decentology/hyperverse-ethereum'
import { ERC721CodeSnippets } from '../../consts'
import { CodeContainer, SubHeader, DEFAULT_THEME, Code } from './shared/Dashboard'

import { useMutation, useQuery } from 'react-query'
import { styled } from '../../../stitches.config'

export const ERC721 = () => {
  const [activeTab, setActiveTab] = React.useState<ModuleTabs>(ModuleTabs.DASHBOARD)

  const { account } = useEthereum()
  const erc721 = useERC721()
  const { data: instance, isLoading, refetch } = useQuery('instance', () => erc721.getProxy!(account), {
    enabled: !!erc721.factoryContract && !!account,
  })
  const { mutate, isLoading: txnLoading, isSuccess } = useMutation('createTokenInstance', erc721.createInstance)

  useEffect(() => {
    if (isSuccess) {
      refetch()
    }
  }, [isSuccess, refetch])

  return (
    <ModuleContainer>
      <Tabs
        defaultValue={ModuleTabs.DASHBOARD}
      >
        <Header>
          <PanelTrigger onClick={() => setActiveTab(ModuleTabs.DASHBOARD)} active={activeTab === ModuleTabs.DASHBOARD} value={ModuleTabs.DASHBOARD}>
            <Heading>Dashboard</Heading>
          </PanelTrigger>
          <PanelTrigger onClick={() => setActiveTab(ModuleTabs.TENANT)} active={activeTab === ModuleTabs.TENANT} value={ModuleTabs.TENANT}>
            <Heading>Tenant Functions</Heading>
          </PanelTrigger>
          <PanelTrigger onClick={() => setActiveTab(ModuleTabs.PUBLIC)} active={activeTab === ModuleTabs.PUBLIC} value={ModuleTabs.PUBLIC}>
            <Heading>Functions</Heading>
          </PanelTrigger>
        </Header>

        <Content value={ModuleTabs.DASHBOARD}>
          <Dashboard
            key="erc721"
            module="erc721"
            instance={instance}
            isLoading={isLoading}
            createInstance={mutate}
            txnLoading={txnLoading}
          />
        </Content>

        <Content value={ModuleTabs.TENANT}>
          <ScrollArea>
            <ViewportStyled>
              <SubHeader>Tenant Functions</SubHeader>

              {ERC721CodeSnippets.ownerFunctions.map((snippet) => {
                return (
                  <CodeContainer key={snippet.name} css={{paddingBottom: 10}}>
                    <Info>
                    <h3>{snippet.name}</h3>
                    {snippet?.description}</Info>
                    {snippet.snippet && (
                      <Code code={snippet.snippet} theme={DEFAULT_THEME} />
                    )}
                  </CodeContainer>
                )
              })}
            </ViewportStyled>
            <ScrollbarStyled orientation="vertical">
              <ThumbStyled />
            </ScrollbarStyled>
          </ScrollArea>
        </Content>
        <Content value={ModuleTabs.PUBLIC}>
          <ScrollArea>
            <ViewportStyled>
              <SubHeader>Functions</SubHeader>

              {ERC721CodeSnippets.publicFunctions.map((snippet) => {
                return (
                  <CodeContainer key={snippet.name} css={{paddingBottom: 10}}>
                    <Info>
                    <h3>{snippet.name}</h3>
                    {snippet?.description}</Info>
                    {snippet.snippet && (
                      <Code code={snippet.snippet} theme={DEFAULT_THEME} />
                    )}
                  </CodeContainer>
                )
              })}
            </ViewportStyled>
            <ScrollbarStyled orientation="vertical">
              <ThumbStyled />
            </ScrollbarStyled>
          </ScrollArea>
        </Content>
        {/* <ContentGrid value={ModuleTabs.PLAYGROUND}>
          <ReadComponent />
          <ReadComponent />
          <ReadComponent />
          <ReadComponent />
          <ReadComponent />
          <ReadComponent />
        </ContentGrid> */}
      </Tabs>
    </ModuleContainer>
  )
}

const Info = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'baseline',
  fontSize: '12px',

  h3: {
    fontSize: '15px',
    fontFamily: `$mono`,
    margin: '0 24px 0 0',
  },

  marginBottom: '10px',

  '@laptop': {
    flexDirection: 'row',
  }
})