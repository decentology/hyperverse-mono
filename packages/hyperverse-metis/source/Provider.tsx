import { FC } from 'react';
import { Provider as EvmProvider, ProviderProps } from '@decentology/hyperverse-evm';
import { Metis } from './useMetis';
import { Network, NetworkConfig } from '@decentology/hyperverse';

export const NETWORKS: { [key in Network]: NetworkConfig } = {
	[Network.Mainnet]: {
		type: Network.Mainnet,
		name: 'andromeda',
		networkUrl: 'https://andromeda.metis.io/?owner=1088',
		chainId: 1088,
		explorerUrl: 'https://andromeda-explorer.metis.io/',
	},
	[Network.Testnet]: {
		type: Network.Testnet,
		name: 'stardust',
		chainId: 588,
		networkUrl: 'https://stardust.metis.io/?owner=588',
		explorerUrl: 'https://stardust.metis.io/',
	},
};

const Provider: FC<ProviderProps> = ({ children, ...props }: ProviderProps) => {
	return (
		<EvmProvider networks={NETWORKS} {...props}>
			<Metis.Provider>{children}</Metis.Provider>
		</EvmProvider>
	);
};

export default Provider;
