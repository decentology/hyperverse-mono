import { initialize, Provider, Network } from '@decentology/hyperverse';
import { Ethereum } from '@decentology/hyperverse-ethereum';
import * as ERC721 from '@decentology/hyperverse-evm-erc721';
import { globalCss } from '../stitches.config';

import type { AppProps } from 'next/app';

const globalStyles = globalCss({
	'*': {
		margin: 0,
		padding: 0,
	},
	html: {
		fontSize: 14,
		fontFamily: 'Proxima Nova, sans-serif',
		letterSpacing: '0.9px',
	},
	body: {
		fontSize: '1rem',
		margin: '30px auto',
		backgroundColor: '$blue500',
		color: '$gray100',
		maxWidth: '1200px',
	}
})


function MyApp({ Component, pageProps }: AppProps) {
	const hyperverse = initialize({
		blockchain: Ethereum,
		network: Network.Testnet,
		modules: [
			{
				bundle: ERC721,
				tenantId: '0x87339e5940F02DD64EFf21203244f2D61cdF5f44',
			}
		],
	});
	globalStyles()
	return (
		<Provider initialState={hyperverse}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
