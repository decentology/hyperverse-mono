import { styled } from '../../../stitches.config'
import Image from 'next/image'
import { useEthereum } from '@decentology/hyperverse-ethereum'
import { Github } from '../icons'
import Link from 'next/link'

export function Nav() {
  const { Connect, error } = useEthereum()
  return (
    <Container>
      <Link href="/playground" passHref>
        <a>
          <Image src="/images/Hyperverse.png" alt="Hyperverse" width={200} height={38} />
        </a>
      </Link>

      <RightContainer>
			<Link href="https://docs.hyperverse.dev/" passHref>
          <a target="_blank" rel="noreferrer">
            Docs
          </a>
        </Link>

        <Link href="https://github.com/decentology/hyperverse-mono" passHref>
          <a target="_blank" rel="noreferrer">
            <Github />
          </a>
        </Link>

   
        <Connect accountStatus="full" />
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
		}
  },
})
