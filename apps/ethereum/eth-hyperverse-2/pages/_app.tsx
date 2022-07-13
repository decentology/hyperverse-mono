import { initialize, Provider, Network } from '@decentology/hyperverse/react'
import { Ethereum } from '@decentology/hyperverse-ethereum/react'
import * as Token from '@decentology/hyperverse-evm-erc20/react'
import * as NFT from '@decentology/hyperverse-evm-erc721/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'
import { globalCss } from '../stitches.config'

const globalStyles = globalCss({
  html: {
    overflowX: 'hidden',
  },

  body: {
    margin: '0 !important',
    backgroundColor: '$black300',
  },

  'body, button': {
    fontFamily: '$body',
    color: '$grey100',
  },

  svg: { display: 'block' },

  'pre, code': { margin: 0, fontFamily: '$mono' },
  section: {
    paddingX: 16,
    '@laptop': {
      paddingX: 0,
      margin: '0 auto',
      minWidth: '1160px',
      maxWidth: '1300px',
    },
  },
})


const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()
  const hyperverse = initialize({
    blockchain: Ethereum,
    network: Network.Testnet,
    modules: [
      {
        bundle: Token,
        tenantId: '0x62a7aa79a52591Ccc62B71729329A80a666fA50f',
      },
      {
        bundle: NFT,
        tenantId: '0x62a7aa79a52591Ccc62B71729329A80a666fA50f',
      },
    ],
  })
  return (
    <QueryClientProvider client={queryClient}>
      <Provider initialState={hyperverse}>
          <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  )
}

export default MyApp
