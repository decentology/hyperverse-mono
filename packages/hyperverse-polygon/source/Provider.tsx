import { FC } from 'react';
import { Provider as EvmProvider, ProviderProps } from '@decentology/hyperverse-evm';
import { Polygon } from './usePolygon';
import { Network } from '@decentology/hyperverse';
const Provider: FC<ProviderProps> = ({ children, ...props }) => {
	return (
		<EvmProvider
			networks={{
				mainnet: {
					type: Network.Mainnet,
					name: 'mainnet',
					networkUrl: 'https://polygon-rpc.com/',
					chainId: 137,
					explorerUrl: 'https://www.polygonscan.com/',
				},
				testnet: {
					type: Network.Testnet,
					name: 'mumbai',
					chainId: 80001,
					networkUrl: 'https://rpc-mumbai.maticvigil.com',
					explorerUrl: 'https://mumbai.polygonscan.com/',
				},
			}}
			{...props}
		>
			<Polygon.Provider>{children}</Polygon.Provider>
		</EvmProvider>
	);
};

export default Provider;
