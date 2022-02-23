import { FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import ABI from '../artifacts/contracts/ERC721.sol/ERC721.json';
import { HyperverseModuleInstance, networks, useHyperverse } from '@decentology/hyperverse';
import { ERC721 } from './useERC721';
const client = new QueryClient();

export const ContractABI = ABI.abi;
export const CONTRACT_TESTNET_ADDRESS = '0xf8CEc073d08e42cdDC1bF1fd8d44ce3252ab7352';
export const TENANT_TESTNET_ADDRESS = '0xD847C7408c48b6b6720CCa75eB30a93acbF5163D';

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	const { network } = useHyperverse();
	if (network === networks.Mainnet && tenantId == null) {
		throw new Error('Tenant ID is required for Mainnet');
	}
	return (
		<QueryClientProvider client={client}>
			<ERC721.Provider initialState={{ tenantId: tenantId || TENANT_TESTNET_ADDRESS }}>
				{children}
			</ERC721.Provider>
		</QueryClientProvider>
	);
};

export { Provider };
