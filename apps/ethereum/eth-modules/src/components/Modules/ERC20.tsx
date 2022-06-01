import { ReadFunction } from './shared/CreateInstance'
import { Root as Tabs } from '@radix-ui/react-tabs'
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

export const ERC20 = () => {
  const [activeTab, setActiveTab] = React.useState<ModuleTabs>(ModuleTabs.DASHBOARD)
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
        <ContentContainer value={ModuleTabs.DASHBOARD}>
          <ReadFunction />
        </ContentContainer>
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
