import Link from 'next/link'
import { useRouter } from 'next/router'
import { styled } from '../../../stitches.config'
import { LINKS } from '../../consts'
import { MediaQuery } from '../../context/MediaQuery'
import { ERC20 } from '../Modules/ERC20'
import { ERC721 } from '../Modules/ERC721'

export const SmartModules = {
  erc721: {
    title: 'ERC721',
    component: ERC721,
  },
  erc20: {
    title: 'ERC20',
    component: ERC20,
  },
}

export const PlaygroundBody = () => {
  const router = useRouter()
  const { module } = router.query
	const { tablet } = MediaQuery.useContainer()


  const moduleDefault = module?.toString() ?? 'erc721'
  return (
    <Container>
      <SubContainer>
        <h1>
          {/* @ts-ignore */}
          {SmartModules[moduleDefault].title}
          &nbsp;{tablet && "Smart "}Module
        </h1>
        <div>
          <Dot />
          <p>audit in {!tablet && <br/>} progress</p>
        </div>
      </SubContainer>
      {/* @ts-ignore */}
      <ContentContainer>{SmartModules[moduleDefault].component()}</ContentContainer>
    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

})

const SubContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: '$mono',
  fontWeight: '400',


  h1: {
    fontSize: 20,
    textTransform: 'capitalize',
    span: {
      textTransform: 'uppercase',
    },
		'@tablet': {
			fontSize: 24,
		},
  },

  a: {
    color: '$white100',
  },

  div: {
    display: 'flex',
    alignItems: 'center',
    p: {
      fontWeight: '300',
      fontSize: 12,
      marginLeft: 10,
  

      '@tablet': {
				width: 'fit-content',
        fontSize: 14,
      },
    },
  },
})

const ContentContainer = styled('div', {
  marginTop: 10,
  width: '100%',
  background: '$blue100',
  borderRadius: 14,
})

const Dot = styled('span', {
  background: 'yellow',
  boxShadow: '0 0 0 1.2px yellow',
  height: 10,
  width: 10,
  borderRadius: '50%',
  display: 'inline-block',
})
