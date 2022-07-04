import Image from 'next/image'
import { styled } from '../stitches.config'

export function Logo({ full }: { full?: boolean }) {
  const image = full ? '/hyperverse-full.png' : '/hyperverse.png'
  const width = full ? 140 : 27
  const height = full ? 27 : 27
  return (
    <LogoContainer>
      <Image src={image} alt="hyperverse" width={width} height={height} />
    </LogoContainer>
  )
}

const LogoContainer = styled('div', {
  display: 'flex',
  cursor: 'pointer',
  marginRight: 10,
})
