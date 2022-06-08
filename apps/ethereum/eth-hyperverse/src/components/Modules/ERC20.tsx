import { Root as Tabs, Content } from '@radix-ui/react-tabs'
import React from 'react'
import { ModuleContainer, Header, PanelTrigger, Heading, ModuleTabs } from './shared/ModuleStyles'
import { Dashboard } from './shared/Dashboard'
import { useERC20 } from '@decentology/hyperverse-evm-erc20'
import { useMutation, useQuery } from 'react-query'
import { useEthereum } from '@decentology/hyperverse-ethereum'

export const ERC20 = () => {
  const [activeTab, setActiveTab] = React.useState<ModuleTabs>(ModuleTabs.DASHBOARD)
  const { account } = useEthereum()

  const erc20 = useERC20()
  const { data: instance, isLoading } = useQuery('instanceERC20', () => erc20.getProxy!(account), {
    enabled: !!erc20.factoryContract && !!account,
  })


  const { mutate } = useMutation('createTokenInstance', erc20.createInstance)

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
 
        </Header>
        <Content value={ModuleTabs.DASHBOARD}>
          <Dashboard key="erc20" module="erc20" instance={instance} isLoading={isLoading} createInstance={mutate} />
        </Content>

      </Tabs>
    </ModuleContainer>
  )
}
