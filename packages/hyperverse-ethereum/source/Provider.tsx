import { FC } from 'react';
import { Provider as EvmProvider, ProviderProps} from '@decentology/hyperverse-evm';
import { Ethereum } from './useEthereum';
import { Network, NetworkConfig } from '@decentology/hyperverse';

const INFURA_ID = process.env.INFURA_API_KEY! || 'fb9f66bab7574d70b281f62e19c27d49';
export const Networks : {[key in Network] : NetworkConfig} = {
	[Network.Mainnet]: {
		type: Network.Mainnet,
		name: 'mainnet',
		networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
		providerId: INFURA_ID, 
		chainId: 1,
	},
	[Network.Testnet]: {
		type: Network.Testnet,
		name: 'rinkeby',
		chainId: 4,
		providerId: INFURA_ID, 
		networkUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
		blockExplorer: 'https://rinkeby.etherscan.io',
	},
};
const Provider: FC<ProviderProps> = ({ children, ...props }:ProviderProps) => {
	return (
		<EvmProvider networks={Networks} { ...props}>
			<Ethereum.Provider>{children}</Ethereum.Provider>
		</EvmProvider>
	);
};

export default Provider;
