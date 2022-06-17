import { styled } from '../../../stitches.config'
import Image from 'next/image'
import { useEthereum } from '@decentology/hyperverse-ethereum'
import { Github } from '../icons'
import Link from 'next/link'
import { LINKS } from '../../consts'
import dynamic from 'next/dynamic'
import { MediaQuery } from '../../context/MediaQuery'

export function Nav() {
  const { Connect } = useEthereum()
  const ClientConnect = dynamic(() => Promise.resolve(Connect), { ssr: false })
	const { laptop } = MediaQuery.useContainer()
  return (
    <Container>
      <Link href="/" passHref>
        <a>
          <Image src="/images/Hyperverse.png" alt="Hyperverse" width={laptop ? 200 : 150} height={laptop ? 38 : 28} />
        </a>
      </Link>

      <RightContainer>
        {/* <Link href={LINKS.Docs} passHref>
          <a target="_blank" rel="noreferrer">
            Docs
          </a>
        </Link>

        <Link href={LINKS.Github} passHref>
          <a target="_blank" rel="noreferrer">
            <Github />
          </a>
        </Link> */}

        <ClientConnect
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }}
        />
      </RightContainer>
    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const RightContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',

  svg: {
    width: 20,
  },

  a: {
    fontSize: 16,
    fontWeight: 400,
    color: '$white100',
    marginRight: 20,

    '&:hover': {
      opacity: 0.8,
    },
  },
})
