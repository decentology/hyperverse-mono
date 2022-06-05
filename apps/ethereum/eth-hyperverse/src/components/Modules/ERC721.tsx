import { styled } from '../../../stitches.config'
import { Dashboard } from './shared/Dashboard'
import { Content, Root as Tabs } from '@radix-ui/react-tabs'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import React from 'react'
import { ReadComponent } from './shared/ReadComponent'
import { ModuleContainer, Header, PanelTrigger, Heading, ContentGrid, ModuleTabs } from './shared/ModuleStyles'
import { useERC721 } from '@decentology/hyperverse-evm-erc721'
import { useEthereum } from '@decentology/hyperverse-ethereum'
import { MODULES } from '../../consts'

import { useMutation, useQuery } from 'react-query'

export const ERC721 = () => {
  const [activeTab, setActiveTab] = React.useState<ModuleTabs>(ModuleTabs.DASHBOARD)

  const { account } = useEthereum()
  const erc721 = useERC721()

  const { data: instance } = useQuery('instance', () => erc721.checkInstance!(account))

	const { mutate, isLoading } = useMutation('createTokenInstance', erc721.createInstance);


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
          <Dashboard />
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
