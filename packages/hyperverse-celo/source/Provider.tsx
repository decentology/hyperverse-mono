import { FC } from 'react';
import { Provider as EvmProvider, } from '@decentology/hyperverse-evm';
import { Celo } from './useCelo';
import { Network, NetworkConfig } from '@decentology/hyperverse';
import './styles.css';
export const Networks : {[key in Network] : NetworkConfig} = {
	[Network.Mainnet]: {
		type: Network.Mainnet,
		name: 'mainnet',
		networkUrl: `https://forno.celo.org`,
		chainId: 42220,
		blockExplorer: 'https://explorer.celo.org',
	},
	[Network.Testnet]: {
		type: Network.Testnet,
		name: 'alfajores',
		chainId: 44787,
		networkUrl: `https://alfajores-forno.celo-testnet.org`,
		blockExplorer: 'https://alfajores-blockscout.celo-testnet.org',
	},
};
const Provider: FC<any> = ({ children, ...props }) => {
	return (
		<EvmProvider networks={Networks} { ...props}>
			<Celo.Provider>{children}</Celo.Provider>
		</EvmProvider>
	);
};

export default Provider;
