import { HyperverseModuleInstance } from '@decentology/hyperverse';
import React, { FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
// import FactoryABI from '../artifacts/contracts/TokenFactory.sol/TokenFactory.json'
// import TokenABI from '../artifacts/contracts/Token.sol/Token.json'
const client = new QueryClient();
type ModuleContext = {} | null;

const Context = React.createContext<ModuleContext>(null);

const Provider: FC<HyperverseModuleInstance> = (props) => {
	return <Context.Provider value={{}}>{props.children}</Context.Provider>;
};

export { Context, Provider };
