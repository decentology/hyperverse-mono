import { Dashboard } from './shared/Dashboard'
import { Content, Root as Tabs } from '@radix-ui/react-tabs'
import React, { useEffect } from 'react'
import { ModuleContainer, Header, PanelTrigger, Heading, ContentGrid, ModuleTabs } from './shared/ModuleStyles'
import { useERC721 } from '@decentology/hyperverse-evm-erc721'
import { useEthereum } from '@decentology/hyperverse-ethereum'

import { useMutation, useQuery } from 'react-query'

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
          <Dashboard
            key="erc721"
            module="erc721"
            instance={instance}
            isLoading={isLoading}
            createInstance={mutate}
            txnLoading={txnLoading}
          />
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
