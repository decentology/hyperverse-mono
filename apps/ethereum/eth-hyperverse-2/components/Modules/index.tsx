import React from 'react'
import { styled } from '../../stitches.config'
import { Container } from '../../components/basics/Container'
import { Root, List, Trigger, Content } from '@radix-ui/react-tabs'
import { useRouter } from 'next/router'
import { Modules as ModulesKey, ModulesInfo } from '../../utils/constants'
import { GetStarted } from './GetStarted'
import { ERC721Dashboard } from './ERC721Dashboard'
import { Code } from './Code'

export const Tabs = {
  GET_STARTED: 'Get Started',
  DASHBOARD: 'Dashboard',
  CODE: 'Code',
} as const

type Tabs = typeof Tabs[keyof typeof Tabs]

export function Modules() {
  const router = useRouter()
  const { module } = router.query

  const currentModule = module ? ModulesKey[module as ModulesKey] : ModulesKey.erc721

  const existingDashboard = currentModule === ModulesKey.erc721

  const [activeTab, setActiveTab] = React.useState<Tabs>(Tabs.GET_STARTED)

  return (
    <div key={router.asPath}>
      <Heading>{ModulesInfo[currentModule].name} Module</Heading>
      <Root defaultValue={Tabs.GET_STARTED}>
        <TabList>
          <TabTrigger
            value={Tabs.GET_STARTED}
            active={activeTab === Tabs.GET_STARTED}
            onClick={() => setActiveTab(Tabs.GET_STARTED)}
          >
            Get Started
          </TabTrigger>
          {!!existingDashboard && (
            <TabTrigger
              value={Tabs.DASHBOARD}
              active={activeTab === Tabs.DASHBOARD}
              onClick={() => setActiveTab(Tabs.DASHBOARD)}
            >
              Dashboard
            </TabTrigger>
          )}
          <TabTrigger value={Tabs.CODE} active={activeTab === Tabs.CODE} onClick={() => setActiveTab(Tabs.CODE)}>
            Code
          </TabTrigger>
        </TabList>
        <Container>
          <StyledContent value={Tabs.GET_STARTED}>
            <GetStarted module={currentModule} />
          </StyledContent>
          {!!existingDashboard && (
            <StyledContent value={Tabs.DASHBOARD}>
              {currentModule === ModulesKey.erc721 && <ERC721Dashboard />}
            </StyledContent>
          )}
          <StyledContent value={Tabs.CODE}>
            <Code module={currentModule} />
          </StyledContent>
        </Container>
      </Root>
    </div>
  )
}

const Heading = styled('h1', {
  fontSize: '1.6rem',
  paddingY: '1rem',
})

const TabList = styled(List, {
  display: 'flex',
  paddingY: '1rem',
  paddingX: 0,
})

const TabTrigger = styled(Trigger, {
  outline: 'none',
  background: 'transparent',
  border: 'none',
  fontSize: '1rem',
  margin: 0,
  padding: 0,
  marginRight: '1.2rem',
  cursor: 'pointer',

  variants: {
    active: {
      false: {
        color: '$grey400',
      },
    },
  },
})

const StyledContent = styled(Content, {
  width: '100%',
  height: '100%',
  position: 'relative',
})
