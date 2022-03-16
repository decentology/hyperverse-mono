import { FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { RandomPick } from './useRandomPick';
const client = new QueryClient();

const Provider: FC<HyperverseModuleInstance> = ({ children }) => {
	return (
		<QueryClientProvider client={client}>
			<RandomPick.Provider>{children}</RandomPick.Provider>
		</QueryClientProvider>
	);
};

export { Provider };
