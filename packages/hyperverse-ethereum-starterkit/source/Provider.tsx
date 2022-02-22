import { createContext, FC } from 'react';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { QueryClientProvider, QueryClient } from 'react-query';
import ABI from '../artifacts/contracts/Module.sol/Module.json';
import { HyperverseModuleInstance, networks, useHyperverse } from '@decentology/hyperverse';
import { Module } from './useHook';
const client = new QueryClient();

export const ContractABI = ABI.abi;
export const CONTRACT_ADDRESS = '';
export const TENANT_ADDRESS = '';

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	const { network } = useHyperverse();
	if (network === networks.Mainnet && tenantId == null) {
		throw new Error('Tenant ID is required for Mainnet');
	}
	return (
		<QueryClientProvider client={client}>
			<Module.Provider initialState={{ tenantId: tenantId || TENANT_ADDRESS }}>
				{children}
			</Module.Provider>
		</QueryClientProvider>
	);
};

export { Provider };
