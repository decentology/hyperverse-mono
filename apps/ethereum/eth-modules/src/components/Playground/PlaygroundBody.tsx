import Link from 'next/link'
import { useRouter } from 'next/router'
import { styled } from '../../../stitches.config'
import { LINKS } from '../../consts'
import { ERC20 } from '../Modules/ERC20'
import { ERC721 } from '../Modules/ERC721'
import { ERC777 } from '../Modules/ERC777'

const SmartModules = {
  erc721: {
    title: 'ERC721',
    component: ERC721,
  },
  erc20: {
    title: 'ERC20',
    component: ERC20,
  },
  erc777: {
    title: 'ERC777',
    component: ERC777,
  },
}

export const PlaygroundBody = () => {
  const router = useRouter()
  const { module } = router.query

  const moduleDefault = module?.toString() ?? 'erc721'
  return (
    <Container>
      <SubContainer>
        <h1>
          {SmartModules[moduleDefault].title}
          &nbsp;Smart Module
        </h1>
        <Link href={LINKS.Paradigm} passHref>
          <a target="_blank" rel="noreferrer">
            get rinkeby eth
          </a>
        </Link>
      </SubContainer>
      <ContentContainer>{SmartModules[moduleDefault].component()}</ContentContainer>
    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

const SubContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  fontFamily: '$mono',
  fontWeight: '400',

  h1: {
    fontSize: 24,
    textTransform: 'capitalize',
    span: {
      textTransform: 'uppercase',
    },
  },

  a: {
    color: '$white100',
  },
})

const ContentContainer = styled('div', {
  marginTop: 10,
  width: 900,
  height: 630,
  background: '$blue100',
  borderRadius: 14,
  padding: '5px 10px',
})
