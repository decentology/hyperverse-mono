import { HyperverseModuleInstance } from '@decentology/hyperverse';
import React, { FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
const client = new QueryClient();
type ModuleContext = {} | null;


const Context = React.createContext<ModuleContext>(null);

const Provider: FC<HyperverseModuleInstance> = (props) => {
	return (
		<QueryClientProvider client={client}>
			<Context.Provider value={{}}>{props.children}</Context.Provider>
		</QueryClientProvider>
	);
};

export { Context, Provider };
