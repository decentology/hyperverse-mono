import { FC } from 'react';
import { Evm } from '@decentology/hyperverse-evm';
import { Ethereum } from './useEthereum';
const Provider: FC<any> = ({ children }) => {
	return (
		<Evm.Provider
			initialState={{
				networks: {
					mainnet: {
						name: 'mainnet',
						chainId: 1,
					},
					testnet: {
						name: 'rinkeby',
						chainId: 4,
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
