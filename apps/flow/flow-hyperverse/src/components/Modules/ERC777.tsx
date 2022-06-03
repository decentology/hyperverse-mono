import { Root as Tabs, Content } from '@radix-ui/react-tabs'
import React from 'react'
import { ReadComponent } from './shared/ReadComponent'
import { ModuleContainer, Header, PanelTrigger, Heading, ContentGrid, ModuleTabs } from './shared/ModuleStyles'
import { Dashboard } from './shared/Dashboard'

export const ERC777 = () => {
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
          {/* <PanelTrigger active={activeTab === ModuleTabs.PLAYGROUND} value={ModuleTabs.PLAYGROUND}>
            <Heading>Playground</Heading>
          </PanelTrigger> */}
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
