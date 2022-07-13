export const HEADER_LINKS = {
  ethereum: 'https://ethereum.org/',
  documentation: 'https://docs.hyperverse.dev/',
  github: 'https://github.com/decentology/hyperverse-mono',
  decentology: 'https://decentology.com/',
  twitter: 'https://twitter.com/hyperverse_dao',
  discord: 'https://discord.gg/hyperversedao',
}


export const gradientYellow = {
  background: 'linear-gradient(90deg, #25759A, $black200)',
  '&:before': {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    maskImage: 'linear-gradient(to bottom, transparent, black)',
    background: 'linear-gradient(90deg, $black200, #8C872A)',
  },
}
export const gradientPink = {
  background: 'linear-gradient(90deg, #E88AE2, $black200)',
  '&:before': {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    maskImage: 'linear-gradient(to bottom, transparent, black)',
    background: 'linear-gradient(90deg, $black200, #15932E)',
  },
}
