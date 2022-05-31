import { styled } from '../../../stitches.config'
import { ReadFunction } from './shared/CreateInstance'
import { Root as Tabs, Content } from '@radix-ui/react-tabs'
import React from 'react'
import { ReadComponent } from './shared/ReadComponent'
import { ModuleContainer, Header, PanelTrigger, Heading, ContentContainer, ModuleTabs } from './shared/ModuleStyles'
import { useERC721 } from '@decentology/hyperverse-evm-erc721'

export const ERC721 = () => {
  const [activeTab, setActiveTab] = React.useState<ModuleTabs>(ModuleTabs.DASHBOARD)
  const erc721 = useERC721()
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
          <ReadFunction />
        </Content>
        <ContentContainer value={ModuleTabs.PLAYGROUND}>
          <ReadComponent />
          <ReadComponent />
          <ReadComponent />
          <ReadComponent />
          <ReadComponent />
          <ReadComponent />
        </ContentContainer>
      </Tabs>
    </ModuleContainer>
  )
}
