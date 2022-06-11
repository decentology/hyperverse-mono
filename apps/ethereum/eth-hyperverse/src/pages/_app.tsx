import { initialize, Provider, Network } from '@decentology/hyperverse'
import { Ethereum } from '@decentology/hyperverse-ethereum'
import * as Token from '@decentology/hyperverse-evm-erc20'
import * as NFT from '@decentology/hyperverse-evm-erc721'
import { globalCss } from '../../stitches.config'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { QueryClient, QueryClientProvider } from 'react-query'

import type { AppProps } from 'next/app'

const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
  },
  html: {
    fontFamily: '$mainFont',
    letterSpacing: '0.9px',
  },
  body: {
    backgroundImage: 'url("images/bkg.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: '$black100',
    color: '$white100',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    fontSize: 16,
    padding: '0 24px',
    minHeight: 700,
    '@desktop': {
      padding: 0,
      width: '1260px',
    },
  },
  a: {
    cursor: 'pointer',
    textDecoration: 'none',

    '&:hover': {
      opacity: 0.8,
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
        <ToastContainer />
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  )
}

export default MyApp
