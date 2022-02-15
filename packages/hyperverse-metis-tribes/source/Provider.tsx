import { FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import ABI from '../utils/Tribes.json';
import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { Tribes } from './useTribes';
const client = new QueryClient();

export const ContractABI = ABI.abi;
export const CONTRACT_ADDRESS = '0x07F3062D51C9A6CA568C8135656054FA88D5b646';
export const TENANT_ADDRESS = '0x8f8B8BE836fbe857c65E892dBb261F249f9b0adb';

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	return (
		<QueryClientProvider client={client}>
			<Tribes.Provider initialState={{ tenantId: tenantId || TENANT_ADDRESS }}>
				{children}
			</Tribes.Provider>
		</QueryClientProvider>
	);
};

export { Provider };
