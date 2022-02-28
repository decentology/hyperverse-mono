import { FC } from 'react';
import { Evm } from '@decentology/hyperverse-evm';
import { Ethereum } from './useEthereum';

const INFURA_ID = process.env.INFURA_API_KEY! || 'fb9f66bab7574d70b281f62e19c27d49';

const Provider: FC<any> = ({ children }) => {
	return (
		<Evm.Provider
			initialState={{
				networks: {
					mainnet: {
						name: 'mainnet',
						networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
						chainId: 1,
					},
					testnet: {
						name: 'rinkeby',
						chainId: 4,
						networkUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
						explorerUrl: 'https://rinkeby.etherscan.io',
					},
				},
			}}
		>
			<Ethereum.Provider>{children}</Ethereum.Provider>
		</Evm.Provider>
	);
};

export default Provider;
