import { HyperverseModuleInstance } from '@decentology/hyperverse';
import React, { FC } from 'react';

type ModuleContext = {} | null;

const Context = React.createContext<ModuleContext>(null);

const Provider: FC<HyperverseModuleInstance> = (props) => {
	return <Context.Provider value={{}}>{props.children}</Context.Provider>;
};

export { Context, Provider };
