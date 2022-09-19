import { initialize, Provider, Network } from '@decentology/hyperverse/react'
import { Ethereum } from '@decentology/hyperverse-ethereum/react'
import { ERC20 } from '@decentology/hyperverse-evm-erc20/react'
import { ERC721 } from '@decentology/hyperverse-evm-erc721/react'
import '@decentology/hyperverse-ethereum/styles.css'
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
		network: Network.Mainnet,
		modules: [
			{
				bundle: ERC20,
				tenantId: '0x9999931619749631f2D53F2A575Dc953922EC5e5',
			},
			{
				bundle: ERC721,
				tenantId: '0x9999931619749631f2D53F2A575Dc953922EC5e5',
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
