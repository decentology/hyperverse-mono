import { FC } from 'react';
import { Evm } from '@decentology/hyperverse-evm';
import { Polygon  } from './usePolygon';
import { Network } from '@decentology/hyperverse';
const Provider: FC<any> = ({ children }) => {
	return (
		<Evm.Provider
			initialState={{
				networks: {
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
				},
			}}
		>
			<Polygon.Provider>{children}</Polygon.Provider>
		</Evm.Provider>
	);
};

export default Provider;
