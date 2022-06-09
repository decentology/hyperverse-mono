import { useRouter } from 'next/router'
import { styled } from '../../../stitches.config'
import { MODULES, LINKS } from '../../consts'

import Link from 'next/link'

export const PlaygroundTab = () => {
  const router = useRouter()
  const { module } = router.query

  return (
    <Container>
      <Heading>Modules</Heading>
      {Object.values(MODULES).map((item) => {
        const selected = item.name.toUpperCase() === module?.toString().toUpperCase()
        return (
          <Link key={item.name} href={item.path} passHref>
            <TabItem selected={selected}>{item.name}</TabItem>
          </Link>
        )
      })}
      <Heading css={{ marginTop: 32 }}>Resources</Heading>

      <ResourceItem>
        <Link href={LINKS.Github}>
          <a target="_blank" rel="noreferrer">
          GitHub
          </a>
        </Link>
      </ResourceItem>
      <ResourceItem>
        <Link href={LINKS.Discord}>
          <a target="_blank" rel="noreferrer">
          Discord
          </a>
        </Link>
      </ResourceItem>
      <ResourceItem>
        <Link href={LINKS.Docs}>
          <a target="_blank" rel="noreferrer">
          Documentation
          </a>
        </Link>
      </ResourceItem>
      <ResourceItem>
        <Link href={LINKS.Paradigm}>
          <a target="_blank" rel="noreferrer">
            Get Rinkeby
          </a>
        </Link>
      </ResourceItem>
      



    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  width: 200,
  height: 670,
  fontFamily: '$mono',
  color: '$white100',
})

const Heading = styled('h3', {
  opacity: 0.8,
  fontSize: 14,
  fontWeight: '400',
  marginBottom: 10,
  marginLeft: 8,
})

const TabItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  margin: '8px 0',
  width: '80%',
  height: 42,
  textTransform: 'capitalize',
  paddingLeft: 8,
  cursor: 'pointer',
  borderRadius: 14,

  '&:hover': {
    background: '$blue100',
    padding: '0 8px',
  },
  variants: {
    selected: {
      true: {
        padding: '0 8px',
        background: 'linear-gradient(93deg, #8CC760 0%, #3898FF 100%)',
        color: '$black100',
        '&:hover': {
          background: 'linear-gradient(93deg, #8CC760 0%, #3898FF 100%)',
        },
      },
    },
  },
})

const ResourceItem = styled('div', {
  display: 'flex',
  margin: '10px 0',
  paddingLeft: 8,
  cursor: 'pointer',
  opacity: 0.9,
  a:{

    color: '$white100',
  },
  '&:hover': {
    opacity: 0.7,
  },
})
